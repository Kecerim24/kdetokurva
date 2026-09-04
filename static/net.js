// Websocket client: identity token, connect, reconnect backoff, dispatch.
const Net = (() => {
    let socket = null;
    let code = null;
    let handler = null;
    let backoff = 500;
    let gotWelcome = false;
    let attempts = 0;
    let stopped = false;

    function token() {
        let t = localStorage.getItem('kdetokurva_token');
        if (!t) {
            t = (window.crypto && crypto.randomUUID)
                ? crypto.randomUUID()
                : String(Date.now()) + Math.random().toString(16).slice(2);
            localStorage.setItem('kdetokurva_token', t);
        }
        return t;
    }

    function open() {
        const proto = location.protocol === 'https:' ? 'wss' : 'ws';
        const url = `${proto}://${location.host}/ws/${encodeURIComponent(code)}?token=${encodeURIComponent(token())}`;
        socket = new WebSocket(url);

        socket.addEventListener('open', () => {
            backoff = 500;
            handler({ type: '_open' });
        });

        socket.addEventListener('message', (event) => {
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch (err) {
                console.error('bad message from server', err, event.data);
                return;
            }
            if (msg.type === 'Welcome') gotWelcome = true;
            handler(msg);
        });

        socket.addEventListener('close', () => {
            if (stopped) return;
            attempts += 1;
            // The upgrade 404s for an unknown room, so we never see a Welcome.
            if (!gotWelcome && attempts >= 3) {
                stopped = true;
                handler({ type: '_dead' });
                return;
            }
            handler({ type: '_closed' });
            setTimeout(open, backoff);
            backoff = Math.min(backoff * 2, 10000);
        });

        socket.addEventListener('error', () => socket.close());
    }

    return {
        token,
        connect(roomCode, onMessage) {
            code = roomCode;
            handler = onMessage;
            open();
        },
        send(msg) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(msg));
            }
        },
    };
})();
