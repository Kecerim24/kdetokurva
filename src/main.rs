use axum::{routing::get, Json, Router};
use serde::Serialize;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use rand::Rng;
use geo::{Point, Contains, BoundingRect, LineString, Polygon};
use geojson::GeoJson;
use std::fs::File;
use std::io::Read;

#[derive(Serialize)]
struct LocationResponse {
    lon: f64,
    lat: f64,
}

#[tokio::main]
async fn main() {
    // build our application with the API route and static file serving
    let app = Router::new()
        .route("/api/random-location", get(random_location_handler))
        .fallback_service(ServeDir::new("static"));

    // run our app with hyper, listening globally on port 3000
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn random_location_handler() -> Json<LocationResponse> {
    let location = get_random_location_in_country("czech_republic.json");
    Json(location)
}

fn get_random_location_in_country(path: &str) -> LocationResponse {
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
            return LocationResponse { lon: lng, lat: lat };
        }
    }
}
