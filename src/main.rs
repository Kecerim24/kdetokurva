use axum::{extract::Path, http, response::{IntoResponse, Response}, routing::get, Json, Router};
use serde::Serialize;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use rand::Rng;
use geo::{Point, Contains, BoundingRect, LineString, Polygon};
use geojson::GeoJson;
use std::fs::File;
use std::io::Read;
use reqwest::StatusCode;
use http::HeaderMap;

#[derive(Serialize)]
struct LocationResponse {
    lon: f64,
    lat: f64,
}

#[tokio::main]
async fn main() {
    // build our application with the API route and static file serving
    let app = Router::new()
        .route("/api/api-key", get(api_key_handler))
        .route("/api/random-location", get(random_location_handler))
        .route("/api/tiles/:type/:z/:x/:y", get(tile_handler))
        .fallback_service(ServeDir::new("static"));

    // run our app with hyper, listening globally on port 3000
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn api_key_handler() -> String {
    env!("API_KEY").to_string()
}

async fn random_location_handler() -> Json<LocationResponse> {
    let (lon, lat) = get_random_location_in_country("czech_republic.json");
    Json(LocationResponse { lon, lat })
}

fn get_random_location_in_country(path: &str) -> (f64, f64) {
    // Load and parse GeoJSON file
    let mut file = File::open(path).expect("Failed to open GeoJSON file");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Failed to read file");
    let geojson: GeoJson = contents.parse().expect("Invalid GeoJSON format");

    // Extract polygon from GeoJSON
    let polygon: Polygon<f64> = match geojson {
        GeoJson::FeatureCollection(fc) => {
            let mut result = None;
            for feature in fc.features {
                if let Some(geometry) = feature.geometry {
                    if let geojson::Value::Polygon(coords) = geometry.value {
                        let exterior: Vec<geo::Coord<f64>> = coords[0]
                            .iter()
                            .map(|pos| geo::Coord { x: pos[0], y: pos[1] })
                            .collect();
                        let line_string = LineString::new(exterior);
                        result = Some(Polygon::new(line_string, vec![]));
                        break;
                    }
                }
            }
            result.unwrap_or_else(|| panic!("No polygon found in GeoJSON!"))
        }
        _ => panic!("GeoJSON must be a Feature or FeatureCollection")
    };

    // Get bounding box
    let bbox = polygon.bounding_rect().unwrap();
    let min = bbox.min();
    let max = bbox.max();
    let min_lng = min.x;
    let min_lat = min.y;
    let max_lng = max.x;
    let max_lat = max.y;

    let mut rng = rand::rng();

    // Generate random points until one is inside the polygon
    loop {
        let lat = rng.random_range(min_lat..max_lat);
        let lng = rng.random_range(min_lng..max_lng);
        let point = Point::new(lng, lat);

        if polygon.contains(&point) {
            return (lng, lat);
        }
    }
}

// Handler for proxying map tiles
async fn tile_handler(
    Path((tile_type, z, x, y)): Path<(String, u32, u32, u32)>,
) -> Result<Response, StatusCode> {
    let api_key = env!("API_KEY").to_string();
    let mapy_url = format!(
        "https://api.mapy.cz/v1/maptiles/{}/256/{}/{}/{}?apikey={}",
        tile_type, z, x, y, api_key
    );

    let client = reqwest::Client::new();
    let response = client.get(&mapy_url).send().await.map_err(|e| {
        eprintln!("Failed to fetch tile from Mapy.cz: {}", e);
        StatusCode::BAD_GATEWAY
    })?;

    if response.status().is_success() {
        let mut headers = HeaderMap::new();
        if let Some(content_type) = response.headers().get(http::header::CONTENT_TYPE) {
            headers.insert(http::header::CONTENT_TYPE, content_type.clone());
        }

        let image_bytes = response.bytes().await.map_err(|e| {
            eprintln!("Failed to read tile bytes: {}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

        Ok((headers, image_bytes).into_response())
    } else {
        eprintln!("Mapy.cz returned error: {}", response.status());
        Err(StatusCode::BAD_GATEWAY)
    }
}
