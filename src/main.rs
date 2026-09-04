mod api;
mod location;
mod pano;
mod protocol;
mod room;
mod ws;

use axum::{
    Router,
    routing::{get, post},
};
use room::AppState;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    // Parse the 3.1 MB country polygon once, up front, so the first round does
    // not pay for it.
    location::warm();

    let app_state = AppState::new(api::api_key());

    let app = Router::new()
        .route("/api/api-key", get(api::api_key_handler)) // raw text
        .route("/api/random-location.json", get(api::random_location_handler))
        .route("/api/tiles/:type/:z/:x/:y", get(api::tile_handler)) // png
        .route("/api/distance.json", post(api::distance_handler))
        .route("/api/rooms", post(api::create_room_handler))
        .route("/api/rooms/:code", get(api::room_exists_handler))
        .route("/ws/:code", get(ws::ws_handler))
        .fallback_service(ServeDir::new("static"))
        .with_state(app_state);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
