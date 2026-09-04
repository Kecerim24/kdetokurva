// Renders the game declaratively from the server's State snapshots.
//
// Two rules keep this honest:
//   * the panorama is (re)loaded only when the pid changes, so a snapshot that
//     arrives because somebody else guessed does not reload the view;
//   * nothing is drawn from coordinates the server has not revealed yet — during
//     a round the snapshot simply does not contain any.

const CZ_CENTER = [49.8175, 15.4730];
const CZ_ZOOM = 7;
const COLORS = [
    '#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45',
    '#fabed4', '#469990', '#dcbeff', '#9a6324', '#ffe119', '#800000', '#aaffc3', '#808000',
];

let apiKey = null;
let map = null;
let roomCode = null;
let me = null;
let shownPid = null;        // pid currently displayed in the panorama
let guessMarker = null;
let resultLayer = null;
let resultsDrawnRound = null;
let roundDeadline = null;   // performance.now() timestamp
let advanceDeadline = null;
let overlayKey = null;
let toastTimer = null;

// ------------------------------------------------------------------ helpers

function el(id) {
    return document.getElementById(id);
}

function colorFor(playerId) {
    return COLORS[playerId % COLORS.length];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatClock(ms) {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDistance(km) {
    if (km === null || km === undefined) return '—';
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function toast(message) {
    const box = el('toast');
    box.textContent = message;
    box.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { box.hidden = true; }, 4000);
}

// -------------------------------------------------------------------- map

function buildMap() {
    map = L.map('map').setView(CZ_CENTER, CZ_ZOOM);

    const tileLayers = {
        'Základní': L.tileLayer('/api/tiles/basic/{z}/{x}/{y}', {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Turistická': L.tileLayer('/api/tiles/outdoor/{z}/{x}/{y}', {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Zimní': L.tileLayer('/api/tiles/winter/{z}/{x}/{y}', {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
    };
    tileLayers['Turistická'].addTo(map);
    L.control.layers(tileLayers).addTo(map);

    // Mapy.cz require their logo over the map.
    const LogoControl = L.Control.extend({
        options: { position: 'bottomleft' },
        onAdd: function () {
            const container = L.DomUtil.create('div');
            const link = L.DomUtil.create('a', '', container);
            link.setAttribute('href', 'http://mapy.cz/');
            link.setAttribute('target', '_blank');
            link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg" />';
            L.DomEvent.disableClickPropagation(link);
            return container;
        },
    });
    new LogoControl().addTo(map);

    map.on('click', (e) => {
        if (!canGuessNow()) return;
        if (guessMarker) map.removeLayer(guessMarker);
        guessMarker = L.marker(e.latlng).addTo(map);
        el('confirmButton').style.display = 'block';
    });
}

function flagIcon() {
    return L.icon({ iconUrl: 'final_flag.svg', iconAnchor: [0, 48] });
}

function clearGuess() {
    if (guessMarker) {
        map.removeLayer(guessMarker);
        guessMarker = null;
    }
    el('confirmButton').style.display = 'none';
}

function clearResults() {
    resultsDrawnRound = null;
    if (resultLayer) {
        map.removeLayer(resultLayer);
        resultLayer = null;
    }
}

function moveMapInto(parent, cls) {
    const mapEl = el('map');
    if (mapEl.parentElement !== parent) {
        parent.appendChild(mapEl);
        setTimeout(() => map.invalidateSize(), 0);
    }
    // Never touch className: Leaflet keeps its own classes on this element.
    if (cls) mapEl.classList.add(cls);
    else mapEl.classList.remove('map-in-results');
}

// -------------------------------------------------------------- panorama

async function loadPano(pid) {
    const container = el('panoCont');
    while (container.firstChild) container.removeChild(container.firstChild);
    el('infoCont').textContent = 'Načítám panorama…';
    el('infoCont').style.display = 'block';

    // The server only ever sends a pid it has already resolved, so there is no
    // retry loop here any more.
    const pano = await Panorama.panoramaFromPid({
        parent: container,
        pid: pid,
        apiKey: apiKey,
        yaw: 5.43,
        pitch: Math.PI / 6,
        fov: Math.PI / 1,
        showNavigation: true,
    });

    el('infoCont').style.display = pano.error ? 'block' : 'none';
    if (pano.error) {
        el('infoCont').textContent = `Panorama se nepodařilo načíst: ${pano.error}`;
    }
}

// -------------------------------------------------------------- overlay

function showOverlay(key, html, actionsHtml) {
    el('overlay').hidden = false;
    if (overlayKey !== key) {
        overlayKey = key;
        el('overlayBody').innerHTML = html;
        el('overlayActions').innerHTML = actionsHtml || '';
        return true; // caller should (re)wire event handlers
    }
    return false;
}

function hideOverlay() {
    el('overlay').hidden = true;
    overlayKey = null;
}

// ------------------------------------------------------------- rendering

let latest = null;

function isHost() {
    return latest && latest.host === me;
}

function canGuessNow() {
    if (!latest || latest.phase.phase !== 'Round') return false;
    const p = latest.phase;
    return !p.guessed.includes(me) && !p.spectators.includes(me);
}

function render(state) {
    latest = state;
    const phase = state.phase;

    if (phase.phase !== 'Round') {
        roundDeadline = null;
    }
    if (phase.phase !== 'Results') {
        advanceDeadline = null;
    }

    switch (phase.phase) {
        case 'Lobby': renderLobby(state); break;
        case 'Loading': renderLoading(state); break;
        case 'Round': renderRound(state); break;
        case 'Results': renderResults(state); break;
        case 'Finished': renderFinished(state); break;
    }
}

function playerListHtml(state) {
    return state.players
        .map((p) => {
            const you = p.id === me ? ' <span class="muted">(ty)</span>' : '';
            const host = p.id === state.host ? ' 👑' : '';
            const off = p.connected ? '' : ' offline';
            return `<li class="player${off}"><span class="dot" style="background:${colorFor(p.id)}"></span>
                <span class="pname">${escapeHtml(p.name)}${host}${you}</span>
                <span class="pscore">${p.total}</span></li>`;
        })
        .join('');
}

function renderLobby(state) {
    el('hud').hidden = true;
    clearGuess();
    clearResults();
    moveMapInto(document.body, '');
    el('map').style.display = '';

    const host = isHost();
    const fresh = showOverlay(
        `Lobby:${host}`,
        `<h2>Místnost <span class="code">${escapeHtml(state.code)}</span></h2>
         <p class="muted">Pošli kód kamarádům, ať se přidají.</p>
         <label for="lobbyName">Tvoje jméno</label>
         <input id="lobbyName" type="text" maxlength="20" />
         <ul id="lobbyPlayers" class="players"></ul>
         ${host ? `<div class="settings">
             <label>Počet kol <input id="setRounds" type="number" min="1" max="20" /></label>
             <label>Čas na kolo (s) <input id="setSecs" type="number" min="10" max="600" step="10" /></label>
         </div>` : '<p class="muted" id="lobbyWait">Čeká se, až hostitel spustí hru.</p>'}`,
        host ? '<button id="startMatch" class="primary">Spustit hru</button>' : ''
    );

    if (fresh) {
        const nameInput = el('lobbyName');
        nameInput.value = localStorage.getItem('kdetokurva_name') || '';
        nameInput.addEventListener('change', () => {
            const name = nameInput.value.trim();
            if (!name) return;
            localStorage.setItem('kdetokurva_name', name);
            Net.send({ type: 'SetName', name });
        });
        if (host) {
            el('setRounds').addEventListener('change', () => {
                Net.send({ type: 'SetSettings', rounds: Number(el('setRounds').value), round_secs: null });
            });
            el('setSecs').addEventListener('change', () => {
                Net.send({ type: 'SetSettings', rounds: null, round_secs: Number(el('setSecs').value) });
            });
            el('startMatch').addEventListener('click', () => Net.send({ type: 'StartMatch' }));
        }
    }

    el('lobbyPlayers').innerHTML = playerListHtml(state);
    // Never clobber a field the user is currently editing.
    const rounds = el('setRounds');
    const secs = el('setSecs');
    if (rounds && document.activeElement !== rounds) rounds.value = state.settings.rounds;
    if (secs && document.activeElement !== secs) secs.value = state.settings.round_secs;
    const nameInput = el('lobbyName');
    const mine = state.players.find((p) => p.id === me);
    if (nameInput && mine && document.activeElement !== nameInput) nameInput.value = mine.name;
}

function renderLoading(state) {
    el('hud').hidden = true;
    clearGuess();
    clearResults();
    showOverlay(
        `Loading:${state.phase.round}`,
        `<h2>Hledám panorama…</h2><p class="muted">Kolo ${state.phase.round + 1} z ${state.total_rounds}</p>`,
        ''
    );
}

function renderRound(state) {
    const p = state.phase;
    hideOverlay();
    clearResults();
    moveMapInto(document.body, '');

    if (p.pid !== shownPid) {
        shownPid = p.pid;
        clearGuess();
        map.setView(CZ_CENTER, CZ_ZOOM);
        loadPano(p.pid);
    }

    roundDeadline = performance.now() + p.ms_remaining;

    el('hud').hidden = false;
    el('hudRound').textContent = `Kolo ${p.round + 1}/${state.total_rounds}`;
    el('hudPlayers').innerHTML = state.players
        .map((pl) => {
            const done = p.guessed.includes(pl.id);
            const spec = p.spectators.includes(pl.id);
            const cls = spec ? 'chip spectator' : done ? 'chip done' : 'chip';
            const mark = spec ? '👁' : done ? '✓' : '…';
            return `<span class="${cls}" style="border-color:${colorFor(pl.id)}">${escapeHtml(pl.name)} ${mark}</span>`;
        })
        .join('');

    if (p.spectators.includes(me)) {
        el('confirmButton').style.display = 'none';
        el('map').style.display = 'none';
    } else {
        el('map').style.display = '';
        if (p.guessed.includes(me)) {
            el('confirmButton').style.display = 'none';
        } else if (guessMarker) {
            el('confirmButton').style.display = 'block';
        }
    }
}

function resultsTableHtml(state) {
    const rows = state.phase.results
        .map((r) => {
            const mine = r.player === me ? ' class="mine"' : '';
            return `<tr${mine}>
                <td><span class="dot" style="background:${colorFor(r.player)}"></span>${escapeHtml(r.name)}</td>
                <td>${formatDistance(r.dist_km)}</td>
                <td>${r.points}</td>
                <td>${r.total}</td>
            </tr>`;
        })
        .join('');
    return `<table class="results">
        <thead><tr><th>Hráč</th><th>Vzdálenost</th><th>Body</th><th>Celkem</th></tr></thead>
        <tbody>${rows}</tbody></table>`;
}

function renderResults(state) {
    const p = state.phase;
    el('hud').hidden = true;
    clearGuess();

    showOverlay(
        `Results:${p.round}:${p.results.length}:${p.ready.join(',')}`,
        `<h2>Kolo ${p.round + 1} z ${state.total_rounds}</h2>${resultsTableHtml(state)}`,
        `<button id="readyBtn">${p.ready.includes(me) ? 'Čekám…' : 'Připraven'}</button>
         ${isHost() ? '<button id="nextBtn" class="primary">Další kolo</button>' : ''}
         <span id="autoNext" class="muted"></span>`
    );

    const ready = el('readyBtn');
    if (ready) {
        ready.disabled = p.ready.includes(me);
        ready.onclick = () => Net.send({ type: 'Ready' });
    }
    const next = el('nextBtn');
    if (next) next.onclick = () => Net.send({ type: 'NextRound' });

    advanceDeadline = p.auto_next_in_ms === null || p.auto_next_in_ms === undefined
        ? null
        : performance.now() + p.auto_next_in_ms;

    // Show the answer and everyone's guesses on a big map.
    el('overlay').hidden = false;
    moveMapInto(el('overlayMapSlot'), 'map-in-results');
    el('map').style.display = 'block';
    if (resultsDrawnRound === p.round) return;
    resultsDrawnRound = p.round;
    clearResults();
    resultLayer = L.layerGroup().addTo(map);
    L.marker([p.truth.lat, p.truth.lon], { icon: flagIcon() }).addTo(resultLayer);

    const bounds = [[p.truth.lat, p.truth.lon]];
    p.results.forEach((r) => {
        if (!r.guess) return;
        const color = colorFor(r.player);
        const mine = r.player === me;
        L.circleMarker([r.guess.lat, r.guess.lon], {
            radius: mine ? 8 : 6,
            color,
            fillColor: color,
            fillOpacity: 0.9,
            weight: 2,
        }).bindTooltip(`${r.name} — ${formatDistance(r.dist_km)}`).addTo(resultLayer);
        L.polyline([[p.truth.lat, p.truth.lon], [r.guess.lat, r.guess.lon]], {
            color,
            weight: mine ? 3 : 1.5,
            opacity: mine ? 1 : 0.5,
            dashArray: mine ? null : '4 4',
        }).addTo(resultLayer);
        bounds.push([r.guess.lat, r.guess.lon]);
    });
    setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }, 30);
}

function renderFinished(state) {
    const p = state.phase;
    el('hud').hidden = true;
    clearGuess();
    clearResults();
    moveMapInto(document.body, '');
    el('map').style.display = 'none';

    const rows = p.standings
        .map((s) => `<tr${s.player === me ? ' class="mine"' : ''}>
            <td>${s.rank}.</td>
            <td><span class="dot" style="background:${colorFor(s.player)}"></span>${escapeHtml(s.name)}</td>
            <td>${s.total}</td></tr>`)
        .join('');

    showOverlay(
        `Finished:${p.standings.map((s) => s.player + ':' + s.total).join(',')}`,
        `<h2>Konec hry</h2>
         <table class="results"><thead><tr><th>#</th><th>Hráč</th><th>Body</th></tr></thead>
         <tbody>${rows}</tbody></table>`,
        isHost()
            ? '<button id="againBtn" class="primary">Hrát znovu</button>'
            : '<span class="muted">Čeká se na hostitele.</span>'
    );

    const again = el('againBtn');
    if (again) again.onclick = () => Net.send({ type: 'PlayAgain' });
}

function showFatal(message) {
    el('hud').hidden = true;
    el('map').style.display = 'none';
    showOverlay(
        `Fatal:${message}`,
        `<h2>Ups</h2><p>${escapeHtml(message)}</p>`,
        '<a class="button primary" href="/">Zpátky na začátek</a>'
    );
}

// --------------------------------------------------------------- ticking

function tick() {
    const timer = el('hudTimer');
    if (roundDeadline !== null) {
        const left = Math.max(0, roundDeadline - performance.now());
        timer.textContent = formatClock(left);
        timer.classList.toggle('urgent', left <= 15000);
    } else {
        timer.textContent = '';
        timer.classList.remove('urgent');
    }

    const auto = el('autoNext');
    if (auto && advanceDeadline !== null) {
        const left = Math.max(0, advanceDeadline - performance.now());
        auto.textContent = `Další kolo za ${Math.ceil(left / 1000)} s`;
    } else if (auto) {
        auto.textContent = '';
    }
}

// -------------------------------------------------------------- messages

function onMessage(msg) {
    switch (msg.type) {
        case '_open': {
            const name = localStorage.getItem('kdetokurva_name');
            if (name) Net.send({ type: 'SetName', name });
            break;
        }
        case '_closed':
            toast('Spojení přerušeno, zkouším znovu…');
            break;
        case '_dead':
            showFatal(`Místnost ${roomCode} neexistuje nebo už skončila.`);
            break;
        case 'Welcome':
            me = msg.you;
            break;
        case 'State':
            render(msg);
            break;
        case 'Error':
            toast(msg.message);
            break;
        case 'Pong':
            break;
        default:
            console.warn('unknown message', msg);
    }
}

// ------------------------------------------------------------------ boot

function wireControls() {
    const mapToggle = el('mapToggle');
    const mapElement = el('map');
    mapToggle.addEventListener('click', () => {
        if (mapElement.style.display === 'none' || mapElement.style.display === '') {
            mapElement.style.display = 'block';
            mapToggle.textContent = '❌';
        } else {
            mapElement.style.display = 'none';
            mapToggle.textContent = '🗺️';
        }
    });

    el('confirmButton').addEventListener('click', () => {
        if (!guessMarker || !latest || latest.phase.phase !== 'Round') return;
        const { lat, lng } = guessMarker.getLatLng();
        Net.send({ type: 'Guess', round: latest.phase.round, lat, lon: lng });
        el('confirmButton').style.display = 'none';
    });

    // Fullscreen needs a real user gesture, so it lives on a button rather than
    // being requested when a round starts.
    el('fullscreenToggle').addEventListener('click', () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen().catch(() => {});
    });
}

async function main() {
    roomCode = new URLSearchParams(location.search).get('room');
    if (!roomCode) {
        location.href = '/';
        return;
    }
    roomCode = roomCode.toUpperCase();
    apiKey = await fetch('/api/api-key').then((r) => r.text());

    buildMap();
    wireControls();
    setInterval(tick, 200);
    Net.connect(roomCode, onMessage);
}

main();
