//! Mapy.cz panorama resolution.
//!
//! The server resolves a random point to a real panorama itself and keeps the
//! panorama's true coordinates. Clients only ever receive the `pid`.

use crate::location;
use reqwest::{Client, StatusCode};
use serde::Deserialize;
use std::collections::HashSet;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::Semaphore;

/// A resolved panorama: its id and where it actually stands.
#[derive(Clone, Copy, Debug)]
pub struct Location {
    pub pid: i64,
    pub lat: f64,
    pub lon: f64,
}

#[derive(Deserialize)]
struct BestResp {
    pid: i64,
    mark: Mark,
}

#[derive(Deserialize)]
struct Mark {
    lat: f64,
    lon: f64,
}

const MAX_ATTEMPTS: u32 = 40;
const ERROR_BUDGET: u32 = 5;
/// After this many misses we widen the search so the loop always converges.
const ESCALATE_AFTER: u32 = 20;
const RADIUS_NEAR: u32 = 1000;
const RADIUS_FAR: u32 = 3000;

/// `Ok(None)` means HTTP 404 — no panorama near that point, which is expected
/// and should simply be retried. `Err` is a transport/quota/parse problem.
pub async fn get_best(
    http: &Client,
    key: &str,
    lon: f64,
    lat: f64,
    radius: u32,
) -> Result<Option<Location>, String> {
    let url = format!(
        "https://api.mapy.cz/v1/panorama/getbest?lon={lon}&lat={lat}&radius={radius}&nopenalties=0"
    );
    let resp = http
        .get(&url)
        .header("Accept", "application/json")
        .header("X-Mapy-Api-Key", key)
        .header("X-SZN-Sdk", "mapyapi/Armstrong")
        .send()
        .await
        .map_err(|e| format!("getbest request failed: {e}"))?;

    match resp.status() {
        StatusCode::NOT_FOUND => Ok(None),
        s if s.is_success() => {
            let raw = resp
                .text()
                .await
                .map_err(|e| format!("getbest body could not be read: {e}"))?;
            let body: BestResp = serde_json::from_str(&raw)
                .map_err(|e| format!("getbest returned unparseable JSON: {e}"))?;
            Ok(Some(Location {
                pid: body.pid,
                lat: body.mark.lat,
                lon: body.mark.lon,
            }))
        }
        s => Err(format!("getbest returned {s}")),
    }
}

/// Sample random points until one has a panorama nearby. About 80% of random
/// points in Czechia hit on the first try, so this normally finishes at once.
///
/// Runs in a detached task — never inside the room actor.
pub async fn find_location(
    http: Client,
    key: &'static str,
    limit: Arc<Semaphore>,
    exclude: HashSet<i64>,
) -> Result<Location, String> {
    let mut errors = 0;
    let mut last_err = String::from("no panorama found");

    for attempt in 0..MAX_ATTEMPTS {
        let radius = if attempt < ESCALATE_AFTER { RADIUS_NEAR } else { RADIUS_FAR };
        let (lon, lat) = location::random_point_in_cz();

        // Cap concurrent calls so many rooms prefetching at once cannot burst
        // through the Mapy quota.
        let permit = match limit.clone().acquire_owned().await {
            Ok(p) => p,
            Err(_) => return Err("panorama semaphore closed".into()),
        };
        let result = get_best(&http, key, lon, lat, radius).await;
        drop(permit);

        match result {
            Ok(Some(loc)) if !exclude.contains(&loc.pid) => return Ok(loc),
            Ok(_) => continue,
            Err(e) => {
                eprintln!("getbest error: {e}");
                last_err = e;
                errors += 1;
                if errors >= ERROR_BUDGET {
                    return Err(last_err);
                }
                tokio::time::sleep(Duration::from_millis(200)).await;
            }
        }
    }

    Err(last_err)
}
