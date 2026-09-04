//! Plain HTTP handlers: the Mapy API key, the tile proxy, room creation, and
//! the two single-player endpoints that predate multiplayer.

use crate::location;
use crate::room::AppState;
use axum::extract::{Path, State};
use axum::http::{self, HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::Json;
use directories::ProjectDirs;
use serde::{Deserialize, Serialize};
use std::fs::{File, create_dir_all};
use std::io::{Read, Write};
use std::sync::LazyLock;

/// Read at runtime rather than with `env!`, so the key does not have to be
/// present at compile time and the untracked `.env` actually works.
static API_KEY: LazyLock<String> = LazyLock::new(|| {
    if let Ok(key) = std::env::var("API_KEY")
        && !key.trim().is_empty()
    {
        return key.trim().to_string();
    }
    if let Ok(contents) = std::fs::read_to_string(".env") {
        for line in contents.lines() {
            let line = line.trim();
            if line.is_empty() || line.starts_with('#') {
                continue;
            }
            if let Some((k, v)) = line.split_once('=')
                && k.trim() == "API_KEY"
            {
                return v.trim().trim_matches('"').to_string();
            }
        }
    }
    panic!("API_KEY is not set — put it in the environment or in .env");
});

pub fn api_key() -> &'static str {
    API_KEY.as_str()
}

#[derive(Serialize)]
pub struct LocationResponse {
    lon: f64,
    lat: f64,
}

#[derive(Deserialize)]
pub struct DistanceRequest {
    lat1: f64,
    lon1: f64,
    lat2: f64,
    lon2: f64,
}

#[derive(Serialize)]
pub struct DistanceResponse {
    distance_meters: f64,
    distance_km: f64,
}

#[derive(Serialize)]
pub struct CreateRoomResponse {
    code: String,
}

pub async fn api_key_handler() -> String {
    api_key().to_string()
}

pub async fn create_room_handler(State(app): State<AppState>) -> Json<CreateRoomResponse> {
    Json(CreateRoomResponse {
        code: app.create_room(),
    })
}

/// Lets the landing page check a code before navigating into the game.
pub async fn room_exists_handler(
    State(app): State<AppState>,
    Path(code): Path<String>,
) -> StatusCode {
    match app.lookup(&code.to_ascii_uppercase()) {
        Some(_) => StatusCode::NO_CONTENT,
        None => StatusCode::NOT_FOUND,
    }
}

pub async fn random_location_handler() -> Json<LocationResponse> {
    let (lon, lat) = location::random_point_in_cz();
    Json(LocationResponse { lon, lat })
}

pub async fn distance_handler(Json(request): Json<DistanceRequest>) -> Json<DistanceResponse> {
    let distance_km = location::distance_km(
        (request.lon1, request.lat1),
        (request.lon2, request.lat2),
    );
    Json(DistanceResponse {
        distance_meters: distance_km * 1000.0,
        distance_km,
    })
}

/// Proxies Mapy.cz raster tiles, caching them on disk.
pub async fn tile_handler(
    State(app): State<AppState>,
    Path((tile_type, z, x, y)): Path<(String, u32, u32, u32)>,
) -> Result<Response, StatusCode> {
    let project_dirs = ProjectDirs::from("cz", "kdetokurva", "kdetokurva")
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;
    let tile_cache_dir = project_dirs
        .cache_dir()
        .join("tiles")
        .join(&tile_type)
        .join(z.to_string())
        .join(x.to_string());
    let tile_path = tile_cache_dir.join(format!("{}.png", y));

    if let Ok(mut file) = File::open(&tile_path) {
        let mut buffer = Vec::new();
        if file.read_to_end(&mut buffer).is_ok() {
            let mut headers = HeaderMap::new();
            headers.insert(http::header::CONTENT_TYPE, "image/png".parse().unwrap());
            return Ok((headers, buffer).into_response());
        }
    }

    let mapy_url = format!(
        "https://api.mapy.cz/v1/maptiles/{}/256/{}/{}/{}?apikey={}",
        tile_type,
        z,
        x,
        y,
        api_key()
    );

    let response = app.http.get(&mapy_url).send().await.map_err(|e| {
        eprintln!("Failed to fetch tile from Mapy.cz: {}", e);
        StatusCode::BAD_GATEWAY
    })?;

    if !response.status().is_success() {
        eprintln!("Mapy.cz returned error: {}", response.status());
        return Err(StatusCode::BAD_GATEWAY);
    }

    let mut headers = HeaderMap::new();
    if let Some(content_type) = response.headers().get(http::header::CONTENT_TYPE) {
        headers.insert(http::header::CONTENT_TYPE, content_type.clone());
    }
    let image_bytes = response.bytes().await.map_err(|e| {
        eprintln!("Failed to read tile bytes: {}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    if let Err(e) = create_dir_all(&tile_cache_dir) {
        eprintln!("Failed to create cache directory: {}", e);
    } else if let Err(e) = File::create(&tile_path).and_then(|mut f| f.write_all(&image_bytes)) {
        eprintln!("Failed to cache tile: {}", e);
    }

    Ok((headers, image_bytes).into_response())
}
