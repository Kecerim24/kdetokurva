//! The websocket wire format.
//!
//! The server sends a *complete state snapshot* after every state change rather
//! than deltas, so reconnect, mid-match join and "did I miss a message?" all
//! collapse into one code path.
//!
//! Anti-cheat is structural: coordinates appear only in `PhaseView::Results`.
//! `PhaseView::Round` carries the panorama id and who has guessed, nothing more.

use serde::{Deserialize, Serialize};

pub type PlayerId = u32;

#[derive(Deserialize, Debug)]
#[serde(tag = "type")]
pub enum ClientMsg {
    SetName { name: String },
    /// Host only.
    SetSettings { rounds: Option<u8>, round_secs: Option<u16> },
    /// Host only, from the lobby.
    StartMatch,
    /// `round` is an anti-stale token: a confirm-click that races the deadline
    /// must not land as a guess for the *next* round's location.
    Guess { round: u32, lat: f64, lon: f64 },
    Ready,
    /// Host only, skips the results pause.
    NextRound,
    /// Host only, from the final leaderboard.
    PlayAgain,
    Ping,
}

#[derive(Serialize, Debug)]
#[serde(tag = "type")]
pub enum ServerMsg {
    /// Unicast, once, right after the socket opens.
    Welcome { you: PlayerId, token: String, code: String },
    /// Broadcast after every state change; also unicast on (re)join.
    State {
        code: String,
        host: Option<PlayerId>,
        players: Vec<PlayerPublic>,
        settings: Settings,
        total_rounds: u32,
        server_now_ms: u64,
        phase: PhaseView,
    },
    /// Unicast. Never fatal by itself.
    Error { code: ErrCode, message: String },
    Pong,
}

#[derive(Serialize, Debug)]
#[serde(tag = "phase")]
pub enum PhaseView {
    Lobby,
    /// Looking for a panorama. Normally invisible thanks to prefetch.
    Loading { round: u32 },
    Round {
        round: u32,
        /// The only location information that leaves the server during a round.
        pid: i64,
        ends_at_ms: u64,
        /// Authoritative, recomputed at serialization time.
        ms_remaining: u64,
        guessed: Vec<PlayerId>,
        spectators: Vec<PlayerId>,
    },
    Results {
        round: u32,
        /// Revealed here and nowhere else.
        truth: LatLon,
        results: Vec<RoundResult>,
        ready: Vec<PlayerId>,
        auto_next_in_ms: Option<u64>,
    },
    Finished { standings: Vec<Standing> },
}

#[derive(Serialize, Clone, Debug)]
pub struct PlayerPublic {
    pub id: PlayerId,
    pub name: String,
    pub total: u32,
    pub connected: bool,
}

#[derive(Serialize, Clone, Copy, Debug)]
pub struct LatLon {
    pub lat: f64,
    pub lon: f64,
}

#[derive(Serialize, Clone, Debug)]
pub struct RoundResult {
    pub player: PlayerId,
    pub name: String,
    /// `None` means they did not guess in time.
    pub guess: Option<LatLon>,
    pub dist_km: Option<f64>,
    /// Points for this round.
    pub points: u32,
    /// Cumulative total after this round.
    pub total: u32,
}

#[derive(Serialize, Clone, Debug)]
pub struct Standing {
    pub player: PlayerId,
    pub name: String,
    pub total: u32,
    /// Dense rank; ties share a rank.
    pub rank: u32,
}

#[derive(Serialize, Clone, Copy, Debug)]
pub struct Settings {
    pub rounds: u8,
    pub round_secs: u16,
}

#[derive(Serialize, Clone, Copy, Debug)]
pub enum ErrCode {
    NotHost,
    WrongPhase,
    AlreadyGuessed,
    StaleRound,
    BadInput,
    RoomFull,
    NoLocation,
    DuplicateSession,
}
