//! Room state machine.
//!
//! Room state is owned by a single tokio task and mutated only by that task,
//! driven by an mpsc command channel. There is no lock on room state; the only
//! lock in the program is the room registry, held for microseconds and never
//! across an `.await`.
//!
//! Load-bearing invariant: `Room::handle` is synchronous and never awaits. All
//! network I/O happens in detached tasks that report back through `self_tx`,
//! and all client writes are `try_send`, so a slow client or a slow Mapy API
//! can never stall a room.

use crate::location;
use crate::pano::{self, Location};
use crate::protocol::{
    ClientMsg, ErrCode, LatLon, PhaseView, PlayerId, PlayerPublic, RoundResult, ServerMsg, Settings,
    Standing,
};
use rand::Rng;
use reqwest::Client;
use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant as StdInstant, SystemTime, UNIX_EPOCH};
use tokio::sync::{Semaphore, mpsc, oneshot};
use tokio::time::{Instant, MissedTickBehavior};

const MAX_PLAYERS: usize = 16;
const RESULT_PAUSE: Duration = Duration::from_secs(8);
const ROOM_TTL: Duration = Duration::from_secs(600);
const GC_INTERVAL: Duration = Duration::from_secs(30);
const OUT_CHANNEL: usize = 32;
const CMD_CHANNEL: usize = 64;
/// No I, O, 0 or 1 — these get misread when someone dictates a code out loud.
const CODE_ALPHABET: &[u8] = b"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DEFAULT_ROUNDS: u8 = 5;
const DEFAULT_ROUND_SECS: u16 = 120;

fn now_ms() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as u64)
        .unwrap_or(0)
}

// ---------------------------------------------------------------- app state

#[derive(Clone)]
pub struct AppState {
    pub http: Client,
    pub api_key: &'static str,
    pub rooms: Arc<Mutex<HashMap<String, RoomHandle>>>,
    pub pano_limit: Arc<Semaphore>,
}

#[derive(Clone)]
pub struct RoomHandle {
    pub code: String,
    pub tx: mpsc::Sender<RoomCmd>,
}

impl AppState {
    pub fn new(api_key: &'static str) -> Self {
        AppState {
            http: Client::new(),
            api_key,
            rooms: Arc::new(Mutex::new(HashMap::new())),
            pano_limit: Arc::new(Semaphore::new(4)),
        }
    }

    pub fn lookup(&self, code: &str) -> Option<RoomHandle> {
        self.rooms.lock().unwrap().get(code).cloned()
    }

    /// Creates a room with a fresh code and spawns its actor task.
    pub fn create_room(&self) -> String {
        let (tx, rx) = mpsc::channel(CMD_CHANNEL);
        let code = {
            let mut reg = self.rooms.lock().unwrap();
            let code = loop {
                let candidate = random_code();
                if !reg.contains_key(&candidate) {
                    break candidate;
                }
            };
            reg.insert(
                code.clone(),
                RoomHandle {
                    code: code.clone(),
                    tx: tx.clone(),
                },
            );
            code
        };
        let room = Room::new(code.clone(), tx, self);
        tokio::spawn(room_task(room, rx));
        code
    }
}

fn random_code() -> String {
    let mut rng = rand::rng();
    (0..4)
        .map(|_| CODE_ALPHABET[rng.random_range(0..CODE_ALPHABET.len())] as char)
        .collect()
}

pub fn random_token() -> String {
    format!("{:032x}", rand::rng().random::<u128>())
}

// ------------------------------------------------------------------ commands

#[derive(Debug)]
pub enum TimerKind {
    /// The round's countdown expired.
    Deadline,
    /// The results screen has been up long enough.
    Advance,
}

pub struct JoinAck {
    pub player: PlayerId,
    pub token: String,
    pub conn_id: u64,
}

pub enum RoomCmd {
    Join {
        token: Option<String>,
        out: mpsc::Sender<Arc<str>>,
        reply: oneshot::Sender<Result<JoinAck, String>>,
    },
    Leave {
        player: PlayerId,
        conn_id: u64,
    },
    Client {
        player: PlayerId,
        msg: ClientMsg,
    },
    Timer {
        seq: u64,
        kind: TimerKind,
    },
    /// A panorama search finished for a round we are currently loading.
    Located {
        seq: u64,
        round: u32,
        res: Result<Location, String>,
    },
    /// A prefetched panorama for a future round.
    Prefetched {
        round: u32,
        res: Result<Location, String>,
    },
}

// --------------------------------------------------------------------- state

struct Guess {
    lat: f64,
    lon: f64,
    dist_km: f64,
    points: u32,
}

struct Player {
    id: PlayerId,
    token: String,
    name: String,
    total: u32,
    connected: bool,
    /// Socket generation. On refresh the new socket often opens before the old
    /// one's close is processed, so `Leave` can arrive after `Join`.
    conn_id: u64,
    out: Option<mpsc::Sender<Arc<str>>>,
    /// First round this player may play; later rounds than the current one mean
    /// they joined mid-match and are spectating.
    joined_round: u32,
    guess: Option<Guess>,
    ready: bool,
}

enum Phase {
    Lobby,
    Loading {
        round: u32,
    },
    Round {
        round: u32,
        loc: Location,
        deadline: Instant,
        ends_at_ms: u64,
    },
    Results {
        round: u32,
        loc: Location,
        results: Vec<RoundResult>,
        advance_at: Option<Instant>,
    },
    Finished,
}

pub struct Room {
    code: String,
    /// Join order, which doubles as the host succession order.
    players: Vec<Player>,
    host: Option<PlayerId>,
    phase: Phase,
    /// Epoch, bumped on every phase transition. Stale timers and stale async
    /// results are dropped by comparing against it.
    seq: u64,
    settings: Settings,
    round_index: u32,
    used_pids: HashSet<i64>,
    prefetch: Option<(u32, Location)>,
    prefetch_inflight: bool,
    next_player_id: PlayerId,
    next_conn_id: u64,
    empty_since: Option<StdInstant>,
    self_tx: mpsc::Sender<RoomCmd>,
    http: Client,
    api_key: &'static str,
    pano_limit: Arc<Semaphore>,
    registry: Arc<Mutex<HashMap<String, RoomHandle>>>,
}

impl Room {
    fn new(code: String, self_tx: mpsc::Sender<RoomCmd>, app: &AppState) -> Room {
        Room {
            code,
            players: Vec::new(),
            host: None,
            phase: Phase::Lobby,
            seq: 0,
            settings: Settings {
                rounds: DEFAULT_ROUNDS,
                round_secs: DEFAULT_ROUND_SECS,
            },
            round_index: 0,
            used_pids: HashSet::new(),
            prefetch: None,
            prefetch_inflight: false,
            next_player_id: 1,
            next_conn_id: 1,
            empty_since: Some(StdInstant::now()),
            self_tx,
            http: app.http.clone(),
            api_key: app.api_key,
            pano_limit: app.pano_limit.clone(),
            registry: app.rooms.clone(),
        }
    }

    // -------------------------------------------------------------- dispatch

    fn handle(&mut self, cmd: RoomCmd) {
        match cmd {
            RoomCmd::Join { token, out, reply } => self.on_join(token, out, reply),
            RoomCmd::Leave { player, conn_id } => self.on_leave(player, conn_id),
            RoomCmd::Client { player, msg } => self.on_client(player, msg),
            RoomCmd::Timer { seq, kind } if seq == self.seq => match kind {
                TimerKind::Deadline => self.end_round(),
                TimerKind::Advance => self.advance(),
            },
            // Stale timer: the phase already moved on some other way.
            RoomCmd::Timer { .. } => {}
            RoomCmd::Located { seq, round, res } if seq == self.seq => self.on_located(round, res),
            RoomCmd::Located { .. } => {}
            RoomCmd::Prefetched { round, res } => self.on_prefetched(round, res),
        }
    }

    fn on_client(&mut self, player: PlayerId, msg: ClientMsg) {
        match msg {
            ClientMsg::Ping => self.unicast(player, ServerMsg::Pong),
            ClientMsg::SetName { name } => self.on_set_name(player, name),
            ClientMsg::SetSettings { rounds, round_secs } => {
                self.on_set_settings(player, rounds, round_secs)
            }
            ClientMsg::StartMatch => self.on_start_match(player),
            ClientMsg::Guess { round, lat, lon } => self.on_guess(player, round, lat, lon),
            ClientMsg::Ready => self.on_ready(player),
            ClientMsg::NextRound => self.on_next_round(player),
            ClientMsg::PlayAgain => self.on_play_again(player),
        }
    }

    // ------------------------------------------------------------ membership

    fn on_join(
        &mut self,
        token: Option<String>,
        out: mpsc::Sender<Arc<str>>,
        reply: oneshot::Sender<Result<JoinAck, String>>,
    ) {
        let token = token
            .filter(|t| t.len() <= 64 && !t.is_empty() && t.chars().all(|c| c.is_ascii_alphanumeric() || c == '-'))
            .unwrap_or_else(random_token);

        let conn_id = self.next_conn_id;
        self.next_conn_id += 1;

        let existing = self.players.iter().position(|p| p.token == token);
        let id = match existing {
            Some(idx) => {
                // Reattach the seat: id, name, total and the current guess all survive.
                let p = &mut self.players[idx];
                if let Some(old) = p.out.take() {
                    let _ = serde_json::to_string(&ServerMsg::Error {
                        code: ErrCode::DuplicateSession,
                        message: "Připojil ses z jiné záložky.".into(),
                    })
                    .map(|s| old.try_send(Arc::from(s.as_str())));
                }
                p.connected = true;
                p.conn_id = conn_id;
                p.out = Some(out);
                p.id
            }
            None => {
                if self.players.len() >= MAX_PLAYERS {
                    let _ = reply.send(Err("Místnost je plná.".into()));
                    return;
                }
                let id = self.next_player_id;
                self.next_player_id += 1;
                let joined_round = match &self.phase {
                    Phase::Lobby | Phase::Finished => 0,
                    // Mid-round joiners spectate and enter at the next round.
                    Phase::Round { round, .. } | Phase::Results { round, .. } => round + 1,
                    Phase::Loading { round } => *round,
                };
                self.players.push(Player {
                    id,
                    token: token.clone(),
                    name: format!("Hráč {id}"),
                    total: 0,
                    connected: true,
                    conn_id,
                    out: Some(out),
                    joined_round,
                    guess: None,
                    ready: false,
                });
                id
            }
        };

        self.empty_since = None;
        if self.host.is_none() {
            self.host = Some(id);
        }

        if reply
            .send(Ok(JoinAck {
                player: id,
                token,
                conn_id,
            }))
            .is_err()
        {
            // The connection vanished between upgrade and join.
            self.mark_gone(id, conn_id);
            return;
        }

        // Someone is back, so the results screen can start advancing again.
        self.rearm_advance_if_needed();
        self.ensure_prefetch(self.round_index);
        self.broadcast();
    }

    fn on_leave(&mut self, player: PlayerId, conn_id: u64) {
        if !self.mark_gone(player, conn_id) {
            return;
        }
        if self.host == Some(player) {
            self.host = self
                .players
                .iter()
                .find(|p| p.connected && p.id != player)
                .map(|p| p.id);
        }
        if self.connected_count() == 0 {
            self.empty_since = Some(StdInstant::now());
        }

        // A leaver must not stall the round: everyone still active may now have
        // guessed. Easy to forget, and the cause of "the round hangs" bugs.
        match &self.phase {
            Phase::Round { round, .. } => {
                let round = *round;
                if self.connected_count() == 0 || self.everyone_guessed(round) {
                    self.end_round();
                    return;
                }
            }
            Phase::Results { .. } => {
                if self.all_ready() {
                    self.advance();
                    return;
                }
            }
            _ => {}
        }
        self.broadcast();
    }

    /// Returns false if this close belongs to a socket that has been superseded.
    fn mark_gone(&mut self, player: PlayerId, conn_id: u64) -> bool {
        let Some(p) = self.players.iter_mut().find(|p| p.id == player) else {
            return false;
        };
        if p.conn_id != conn_id {
            return false; // stale close from a socket we already replaced
        }
        p.connected = false;
        p.out = None;
        p.ready = false;
        true
    }

    fn on_set_name(&mut self, player: PlayerId, name: String) {
        let name: String = name.trim().chars().take(20).collect();
        if name.is_empty() {
            self.unicast_err(player, ErrCode::BadInput, "Jméno nesmí být prázdné.");
            return;
        }
        if let Some(p) = self.players.iter_mut().find(|p| p.id == player) {
            p.name = name;
        }
        self.broadcast();
    }

    // ----------------------------------------------------------- match flow

    fn on_set_settings(&mut self, player: PlayerId, rounds: Option<u8>, round_secs: Option<u16>) {
        if !self.require_host(player) {
            return;
        }
        if !matches!(self.phase, Phase::Lobby) {
            self.unicast_err(player, ErrCode::WrongPhase, "Nastavení jde měnit jen v lobby.");
            return;
        }
        if let Some(r) = rounds {
            self.settings.rounds = r.clamp(1, 20);
        }
        if let Some(s) = round_secs {
            self.settings.round_secs = s.clamp(10, 600);
        }
        self.broadcast();
    }

    fn on_start_match(&mut self, player: PlayerId) {
        if !self.require_host(player) {
            return;
        }
        if !matches!(self.phase, Phase::Lobby) {
            self.unicast_err(player, ErrCode::WrongPhase, "Hra už běží.");
            return;
        }
        self.reset_for_new_match();
        self.start_round(0);
    }

    fn on_play_again(&mut self, player: PlayerId) {
        if !self.require_host(player) {
            return;
        }
        if !matches!(self.phase, Phase::Finished) {
            self.unicast_err(player, ErrCode::WrongPhase, "Hra ještě neskončila.");
            return;
        }
        self.reset_for_new_match();
        self.seq += 1;
        self.phase = Phase::Lobby;
        self.round_index = 0;
        self.ensure_prefetch(0);
        self.broadcast();
    }

    fn reset_for_new_match(&mut self) {
        self.players.retain(|p| p.connected);
        for p in &mut self.players {
            p.total = 0;
            p.guess = None;
            p.ready = false;
            p.joined_round = 0;
        }
        if !self.players.iter().any(|p| Some(p.id) == self.host) {
            self.host = self.players.first().map(|p| p.id);
        }
        self.used_pids.clear();
        self.prefetch = None;
    }

    fn on_next_round(&mut self, player: PlayerId) {
        if !self.require_host(player) {
            return;
        }
        if !matches!(self.phase, Phase::Results { .. }) {
            self.unicast_err(player, ErrCode::WrongPhase, "Teď se nedá pokračovat.");
            return;
        }
        self.advance();
    }

    fn on_ready(&mut self, player: PlayerId) {
        if !matches!(self.phase, Phase::Results { .. }) {
            return;
        }
        if let Some(p) = self.players.iter_mut().find(|p| p.id == player) {
            p.ready = true;
        }
        if self.all_ready() {
            self.advance();
        } else {
            self.broadcast();
        }
    }

    fn on_guess(&mut self, player: PlayerId, round: u32, lat: f64, lon: f64) {
        let (current, loc) = match &self.phase {
            Phase::Round { round, loc, .. } => (*round, *loc),
            _ => {
                self.unicast_err(player, ErrCode::WrongPhase, "Kolo právě neběží.");
                return;
            }
        };
        if round != current {
            self.unicast_err(player, ErrCode::StaleRound, "Tenhle tip patřil k jinému kolu.");
            return;
        }
        if !lat.is_finite() || !lon.is_finite() || !(-90.0..=90.0).contains(&lat) || !(-180.0..=180.0).contains(&lon) {
            self.unicast_err(player, ErrCode::BadInput, "Neplatné souřadnice.");
            return;
        }

        let err = match self.players.iter().find(|p| p.id == player) {
            None => return,
            Some(p) if p.joined_round > current => {
                Some((ErrCode::WrongPhase, "Přidal ses během kola, hraješ od dalšího."))
            }
            Some(p) if p.guess.is_some() => Some((ErrCode::AlreadyGuessed, "Už jsi v tomhle kole hádal.")),
            Some(_) => None,
        };
        if let Some((code, msg)) = err {
            self.unicast_err(player, code, msg);
            return;
        }

        let dist_km = location::distance_km((lon, lat), (loc.lon, loc.lat));
        let points = location::round_points(dist_km);
        if let Some(p) = self.players.iter_mut().find(|p| p.id == player) {
            p.guess = Some(Guess { lat, lon, dist_km, points });
        }

        if self.everyone_guessed(current) {
            self.end_round();
        } else {
            self.broadcast();
        }
    }

    // ------------------------------------------------------------ transitions

    fn start_round(&mut self, index: u32) {
        self.seq += 1;
        self.round_index = index;
        for p in &mut self.players {
            p.guess = None;
            p.ready = false;
        }

        match self.prefetch.take() {
            Some((r, loc)) if r == index => self.begin_round_with(loc),
            other => {
                // Keep a prefetch that belongs to some other round.
                self.prefetch = other.filter(|(r, _)| *r != index);
                self.phase = Phase::Loading { round: index };
                self.spawn_locate(self.seq, index);
                self.broadcast();
            }
        }
    }

    fn begin_round_with(&mut self, loc: Location) {
        self.used_pids.insert(loc.pid);
        let dur = Duration::from_secs(self.settings.round_secs as u64);
        let deadline = Instant::now() + dur;
        self.phase = Phase::Round {
            round: self.round_index,
            loc,
            deadline,
            ends_at_ms: now_ms() + dur.as_millis() as u64,
        };
        self.arm(deadline, TimerKind::Deadline);
        self.ensure_prefetch(self.round_index + 1);
        self.broadcast();
    }

    fn end_round(&mut self) {
        let (round, loc) = match &self.phase {
            Phase::Round { round, loc, .. } => (*round, *loc),
            _ => return, // idempotence guard: already ended some other way
        };
        self.seq += 1; // invalidates the pending deadline timer

        let mut results = Vec::new();
        for p in &mut self.players {
            if p.joined_round > round {
                continue; // spectator this round
            }
            let (guess, dist_km, points) = match &p.guess {
                Some(g) => (
                    Some(LatLon { lat: g.lat, lon: g.lon }),
                    Some(g.dist_km),
                    g.points,
                ),
                None => (None, None, 0),
            };
            p.total += points;
            results.push(RoundResult {
                player: p.id,
                name: p.name.clone(),
                guess,
                dist_km,
                points,
                total: p.total,
            });
        }
        results.sort_by(|a, b| b.points.cmp(&a.points));

        // Only run the auto-advance clock while somebody is here to watch it.
        let advance_at = (self.connected_count() > 0).then(|| Instant::now() + RESULT_PAUSE);
        self.phase = Phase::Results {
            round,
            loc,
            results,
            advance_at,
        };
        if let Some(at) = advance_at {
            self.arm(at, TimerKind::Advance);
        }
        self.broadcast();
    }

    fn advance(&mut self) {
        let round = match &self.phase {
            Phase::Results { round, .. } => *round,
            _ => return,
        };
        if round + 1 >= self.settings.rounds as u32 {
            self.seq += 1;
            self.phase = Phase::Finished;
            self.broadcast();
        } else {
            self.start_round(round + 1);
        }
    }

    /// If everyone left while the results were up, no Advance timer is running.
    /// Start one again when somebody comes back.
    fn rearm_advance_if_needed(&mut self) {
        let needs = matches!(&self.phase, Phase::Results { advance_at: None, .. })
            && self.connected_count() > 0;
        if !needs {
            return;
        }
        let at = Instant::now() + RESULT_PAUSE;
        if let Phase::Results { advance_at, .. } = &mut self.phase {
            *advance_at = Some(at);
        }
        self.arm(at, TimerKind::Advance);
    }

    fn abort_to_lobby(&mut self, message: &str) {
        self.seq += 1;
        self.phase = Phase::Lobby;
        self.round_index = 0;
        self.prefetch = None;
        for p in &mut self.players {
            p.guess = None;
            p.ready = false;
            p.joined_round = 0;
        }
        self.broadcast_err(ErrCode::NoLocation, message);
        self.broadcast();
    }

    // ------------------------------------------------- panorama acquisition

    fn on_located(&mut self, round: u32, res: Result<Location, String>) {
        if !matches!(&self.phase, Phase::Loading { round: r } if *r == round) {
            return;
        }
        match res {
            Ok(loc) => self.begin_round_with(loc),
            Err(e) => {
                eprintln!("room {}: could not find a panorama: {e}", self.code);
                self.abort_to_lobby("Nepodařilo se najít panorama. Zkuste to prosím znovu.");
            }
        }
    }

    fn on_prefetched(&mut self, round: u32, res: Result<Location, String>) {
        self.prefetch_inflight = false;
        match res {
            Ok(loc) => {
                // If we are already waiting on exactly this round, use it now.
                if matches!(&self.phase, Phase::Loading { round: r } if *r == round) {
                    self.begin_round_with(loc);
                } else {
                    self.prefetch = Some((round, loc));
                }
            }
            Err(e) => eprintln!("room {}: prefetch failed: {e}", self.code),
        }
    }

    fn ensure_prefetch(&mut self, for_round: u32) {
        if self.prefetch_inflight
            || for_round >= self.settings.rounds as u32
            || matches!(self.prefetch, Some((r, _)) if r == for_round)
        {
            return;
        }
        self.prefetch_inflight = true;
        let (tx, http, key, lim, exclude) = (
            self.self_tx.clone(),
            self.http.clone(),
            self.api_key,
            self.pano_limit.clone(),
            self.used_pids.clone(),
        );
        tokio::spawn(async move {
            let res = pano::find_location(http, key, lim, exclude).await;
            let _ = tx.send(RoomCmd::Prefetched { round: for_round, res }).await;
        });
    }

    fn spawn_locate(&self, seq: u64, round: u32) {
        let (tx, http, key, lim, exclude) = (
            self.self_tx.clone(),
            self.http.clone(),
            self.api_key,
            self.pano_limit.clone(),
            self.used_pids.clone(),
        );
        tokio::spawn(async move {
            let res = pano::find_location(http, key, lim, exclude).await;
            let _ = tx.send(RoomCmd::Located { seq, round, res }).await;
        });
    }

    /// Timers are never aborted — the epoch check in `handle` is what makes a
    /// superseded timer harmless, so there are no JoinHandles to track.
    fn arm(&self, at: Instant, kind: TimerKind) {
        let (tx, seq) = (self.self_tx.clone(), self.seq);
        tokio::spawn(async move {
            tokio::time::sleep_until(at).await;
            let _ = tx.send(RoomCmd::Timer { seq, kind }).await;
        });
    }

    // ----------------------------------------------------------- fan-out

    fn broadcast(&mut self) {
        let msg = self.state_msg();
        let Ok(json) = serde_json::to_string(&msg) else {
            return;
        };
        let text: Arc<str> = Arc::from(json.as_str());
        for p in &mut self.players {
            let failed = match &p.out {
                Some(tx) => tx.try_send(text.clone()).is_err(),
                None => false,
            };
            if failed {
                // Closed, or a client that stopped consuming. Either way the
                // connection task will follow up with a Leave.
                p.out = None;
                p.connected = false;
            }
        }
    }

    fn unicast(&self, player: PlayerId, msg: ServerMsg) {
        let Some(p) = self.players.iter().find(|p| p.id == player) else {
            return;
        };
        let (Some(tx), Ok(json)) = (&p.out, serde_json::to_string(&msg)) else {
            return;
        };
        let _ = tx.try_send(Arc::from(json.as_str()));
    }

    fn unicast_err(&self, player: PlayerId, code: ErrCode, message: &str) {
        self.unicast(
            player,
            ServerMsg::Error {
                code,
                message: message.to_string(),
            },
        );
    }

    fn broadcast_err(&self, code: ErrCode, message: &str) {
        let msg = ServerMsg::Error {
            code,
            message: message.to_string(),
        };
        let Ok(json) = serde_json::to_string(&msg) else {
            return;
        };
        let text: Arc<str> = Arc::from(json.as_str());
        for p in &self.players {
            if let Some(tx) = &p.out {
                let _ = tx.try_send(text.clone());
            }
        }
    }

    fn state_msg(&self) -> ServerMsg {
        ServerMsg::State {
            code: self.code.clone(),
            host: self.host,
            players: self
                .players
                .iter()
                .map(|p| PlayerPublic {
                    id: p.id,
                    name: p.name.clone(),
                    total: p.total,
                    connected: p.connected,
                })
                .collect(),
            settings: self.settings,
            total_rounds: self.settings.rounds as u32,
            server_now_ms: now_ms(),
            phase: self.phase_view(),
        }
    }

    fn phase_view(&self) -> PhaseView {
        match &self.phase {
            Phase::Lobby => PhaseView::Lobby,
            Phase::Loading { round } => PhaseView::Loading { round: *round },
            Phase::Round {
                round,
                loc,
                deadline,
                ends_at_ms,
            } => PhaseView::Round {
                round: *round,
                pid: loc.pid,
                ends_at_ms: *ends_at_ms,
                ms_remaining: deadline.saturating_duration_since(Instant::now()).as_millis() as u64,
                guessed: self
                    .players
                    .iter()
                    .filter(|p| p.guess.is_some())
                    .map(|p| p.id)
                    .collect(),
                spectators: self
                    .players
                    .iter()
                    .filter(|p| p.joined_round > *round)
                    .map(|p| p.id)
                    .collect(),
            },
            Phase::Results {
                round,
                loc,
                results,
                advance_at,
            } => PhaseView::Results {
                round: *round,
                truth: LatLon {
                    lat: loc.lat,
                    lon: loc.lon,
                },
                results: results.clone(),
                ready: self
                    .players
                    .iter()
                    .filter(|p| p.ready)
                    .map(|p| p.id)
                    .collect(),
                auto_next_in_ms: advance_at
                    .map(|at| at.saturating_duration_since(Instant::now()).as_millis() as u64),
            },
            Phase::Finished => PhaseView::Finished {
                standings: self.standings(),
            },
        }
    }

    fn standings(&self) -> Vec<Standing> {
        let mut sorted: Vec<&Player> = self.players.iter().collect();
        sorted.sort_by(|a, b| b.total.cmp(&a.total));
        let mut out: Vec<Standing> = Vec::with_capacity(sorted.len());
        for (i, p) in sorted.iter().enumerate() {
            // Dense ranks: ties share a rank.
            let rank = match out.last() {
                Some(prev) if prev.total == p.total => prev.rank,
                _ => i as u32 + 1,
            };
            out.push(Standing {
                player: p.id,
                name: p.name.clone(),
                total: p.total,
                rank,
            });
        }
        out
    }

    // ----------------------------------------------------------- predicates

    fn require_host(&self, player: PlayerId) -> bool {
        if self.host == Some(player) {
            return true;
        }
        self.unicast_err(player, ErrCode::NotHost, "Tohle může udělat jen hostitel.");
        false
    }

    fn connected_count(&self) -> usize {
        self.players.iter().filter(|p| p.connected).count()
    }

    fn everyone_guessed(&self, round: u32) -> bool {
        let mut active = self
            .players
            .iter()
            .filter(|p| p.connected && p.joined_round <= round)
            .peekable();
        active.peek().is_some() && active.all(|p| p.guess.is_some())
    }

    fn all_ready(&self) -> bool {
        let mut active = self.players.iter().filter(|p| p.connected).peekable();
        active.peek().is_some() && active.all(|p| p.ready)
    }

    /// Removes the room from the registry once it has been empty long enough.
    fn try_retire(&mut self) -> bool {
        if self.connected_count() > 0 {
            self.empty_since = None;
            return false;
        }
        let since = *self.empty_since.get_or_insert_with(StdInstant::now);
        if since.elapsed() < ROOM_TTL {
            return false;
        }
        let mut reg = self.registry.lock().unwrap();
        if reg
            .get(&self.code)
            .is_some_and(|h| h.tx.same_channel(&self.self_tx))
        {
            reg.remove(&self.code);
        }
        true
    }
}

async fn room_task(mut room: Room, mut rx: mpsc::Receiver<RoomCmd>) {
    room.ensure_prefetch(0);
    let mut gc = tokio::time::interval(GC_INTERVAL);
    gc.set_missed_tick_behavior(MissedTickBehavior::Delay);

    loop {
        // Every branch binds irrefutably and matches inside the handler. A
        // refutable pattern here (`Some(cmd) = rx.recv()`) would permanently
        // disable the branch instead of ending the loop, and once all branches
        // are disabled tokio's select! panics.
        tokio::select! {
            cmd = rx.recv() => match cmd {
                Some(cmd) => room.handle(cmd),
                None => break,
            },
            _ = gc.tick() => {
                if room.try_retire() {
                    break;
                }
            }
        }
    }
}

pub fn out_channel() -> (mpsc::Sender<Arc<str>>, mpsc::Receiver<Arc<str>>) {
    mpsc::channel(OUT_CHANNEL)
}
