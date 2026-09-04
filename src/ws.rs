//! Websocket upgrade and the per-connection task.

use crate::protocol::{ClientMsg, ErrCode, ServerMsg};
use crate::room::{AppState, RoomCmd, RoomHandle, out_channel};
use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Deserialize;
use std::time::Duration;
use tokio::sync::oneshot;
use tokio::time::Instant;

const PING_EVERY: Duration = Duration::from_secs(30);
/// Proxies drop idle sockets; axum does not keep them alive for you.
const SILENCE_TIMEOUT: Duration = Duration::from_secs(90);

#[derive(Deserialize)]
pub struct JoinQuery {
    token: Option<String>,
}

pub async fn ws_handler(
    State(app): State<AppState>,
    Path(code): Path<String>,
    Query(q): Query<JoinQuery>,
    ws: WebSocketUpgrade,
) -> Response {
    let code = code.to_ascii_uppercase();
    // Rejecting before the upgrade makes "no such room" easy to show in the UI.
    let Some(room) = app.lookup(&code) else {
        return (StatusCode::NOT_FOUND, "no such room").into_response();
    };
    ws.on_upgrade(move |socket| conn_task(socket, room, q.token))
}

async fn conn_task(mut socket: WebSocket, room: RoomHandle, token: Option<String>) {
    let (out_tx, mut out_rx) = out_channel();
    let (reply_tx, reply_rx) = oneshot::channel();

    if room
        .tx
        .send(RoomCmd::Join {
            token,
            out: out_tx,
            reply: reply_tx,
        })
        .await
        .is_err()
    {
        return; // room retired between lookup and join
    }

    let ack = match reply_rx.await {
        Ok(Ok(ack)) => ack,
        Ok(Err(message)) => {
            send_json(
                &mut socket,
                &ServerMsg::Error {
                    code: ErrCode::RoomFull,
                    message,
                },
            )
            .await;
            let _ = socket.send(Message::Close(None)).await;
            return;
        }
        Err(_) => return,
    };

    send_json(
        &mut socket,
        &ServerMsg::Welcome {
            you: ack.player,
            token: ack.token.clone(),
            code: room.code.clone(),
        },
    )
    .await;

    let mut ping = tokio::time::interval(PING_EVERY);
    ping.reset();
    let mut last_seen = Instant::now();

    loop {
        // Irrefutable bindings only; see the note in room.rs.
        tokio::select! {
            outgoing = out_rx.recv() => match outgoing {
                Some(text) => {
                    if socket.send(Message::Text(text.to_string())).await.is_err() {
                        break;
                    }
                }
                None => break, // evicted by the room (duplicate session)
            },
            incoming = socket.recv() => match incoming {
                Some(Ok(Message::Text(text))) => {
                    last_seen = Instant::now();
                    match serde_json::from_str::<ClientMsg>(&text) {
                        Ok(msg) => {
                            if room.tx.send(RoomCmd::Client { player: ack.player, msg }).await.is_err() {
                                break;
                            }
                        }
                        Err(e) => {
                            send_json(&mut socket, &ServerMsg::Error {
                                code: ErrCode::BadInput,
                                message: format!("Nesrozumitelná zpráva: {e}"),
                            }).await;
                        }
                    }
                }
                Some(Ok(Message::Close(_))) | None => break,
                Some(Err(_)) => break,
                // Ping/Pong/Binary: axum answers pings for us.
                Some(Ok(_)) => last_seen = Instant::now(),
            },
            _ = ping.tick() => {
                if last_seen.elapsed() > SILENCE_TIMEOUT {
                    break;
                }
                if socket.send(Message::Ping(Vec::new())).await.is_err() {
                    break;
                }
            }
        }
    }

    let _ = room
        .tx
        .send(RoomCmd::Leave {
            player: ack.player,
            conn_id: ack.conn_id,
        })
        .await;
}

async fn send_json(socket: &mut WebSocket, msg: &ServerMsg) {
    if let Ok(json) = serde_json::to_string(msg) {
        let _ = socket.send(Message::Text(json)).await;
    }
}
