//! Country polygon, random point sampling, distance and scoring.
//!
//! Deliberately NOT named `geo.rs`: a top-level module called `geo` would make
//! `use geo::Point` ambiguous with the `geo` crate (E0659).

use geo::{BoundingRect, Contains, Distance, Geodesic, LineString, MultiPolygon, Point, Polygon, Rect};
use geojson::GeoJson;
use rand::Rng;
use std::sync::LazyLock;

pub struct Country {
    pub poly: MultiPolygon<f64>,
    pub bbox: Rect<f64>,
}

/// Parsed once. Embedded in the binary so the server no longer depends on being
/// launched from the repo root.
static CZ: LazyLock<Country> = LazyLock::new(|| {
    let raw = include_str!("../czech_republic.geojson");
    let gj: GeoJson = raw.parse().expect("czech_republic.geojson is not valid GeoJSON");
    let poly = MultiPolygon::new(collect_polygons(&gj));
    assert!(!poly.0.is_empty(), "no polygon found in czech_republic.geojson");
    let bbox = poly.bounding_rect().expect("country polygon has no bounding rect");
    Country { poly, bbox }
});

/// Force the parse at startup so the first round does not pay for it.
pub fn warm() {
    LazyLock::force(&CZ);
}

fn collect_polygons(gj: &GeoJson) -> Vec<Polygon<f64>> {
    let mut out = Vec::new();
    match gj {
        GeoJson::FeatureCollection(fc) => {
            for f in &fc.features {
                if let Some(g) = &f.geometry {
                    push_geometry(&g.value, &mut out);
                }
            }
        }
        GeoJson::Feature(f) => {
            if let Some(g) = &f.geometry {
                push_geometry(&g.value, &mut out);
            }
        }
        GeoJson::Geometry(g) => push_geometry(&g.value, &mut out),
    }
    out
}

/// Handles both `Polygon` and `MultiPolygon` and keeps interior rings — the
/// original loader took only the first polygon and dropped every hole.
fn push_geometry(value: &geojson::Value, out: &mut Vec<Polygon<f64>>) {
    match value {
        geojson::Value::Polygon(rings) => out.push(polygon_from(rings)),
        geojson::Value::MultiPolygon(polys) => out.extend(polys.iter().map(|r| polygon_from(r))),
        geojson::Value::GeometryCollection(gc) => {
            for g in gc {
                push_geometry(&g.value, out);
            }
        }
        _ => {}
    }
}

fn polygon_from(rings: &[Vec<Vec<f64>>]) -> Polygon<f64> {
    let ring = |r: &Vec<Vec<f64>>| -> LineString<f64> {
        LineString::new(r.iter().map(|p| geo::Coord { x: p[0], y: p[1] }).collect())
    };
    let exterior = rings.first().map(&ring).unwrap_or_else(|| LineString::new(vec![]));
    let interiors = rings.iter().skip(1).map(&ring).collect();
    Polygon::new(exterior, interiors)
}

/// Rejection-sample a random point inside the country. Returns `(lon, lat)`.
pub fn random_point_in_cz() -> (f64, f64) {
    let mut rng = rand::rng();
    let (min, max) = (CZ.bbox.min(), CZ.bbox.max());
    loop {
        let lon = rng.random_range(min.x..max.x);
        let lat = rng.random_range(min.y..max.y);
        if CZ.poly.contains(&Point::new(lon, lat)) {
            return (lon, lat);
        }
    }
}

/// Geodesic distance in kilometres. Both arguments are `(lon, lat)`.
pub fn distance_km(a: (f64, f64), b: (f64, f64)) -> f64 {
    Geodesic.distance(Point::new(a.0, a.1), Point::new(b.0, b.1)) / 1000.0
}

/// GeoGuessr-style exponential decay tuned to the size of Czechia.
/// 0 km -> 5000, 10 km -> 3894, 40 km -> 1839, 100 km -> 410, 300 km -> 3.
pub fn round_points(dist_km: f64) -> u32 {
    const MAX: f64 = 5000.0;
    const SCALE_KM: f64 = 40.0;
    if !dist_km.is_finite() || dist_km < 0.0 {
        return 0;
    }
    (MAX * (-dist_km / SCALE_KM).exp()).round() as u32
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn points_follow_the_curve() {
        assert_eq!(round_points(0.0), 5000);
        assert_eq!(round_points(10.0), 3894);
        assert_eq!(round_points(40.0), 1839);
        assert_eq!(round_points(100.0), 410);
        assert_eq!(round_points(f64::NAN), 0);
        assert_eq!(round_points(-1.0), 0);
        assert_eq!(round_points(100_000.0), 0);
    }

    #[test]
    fn sampled_points_are_inside_the_country() {
        for _ in 0..20 {
            let (lon, lat) = random_point_in_cz();
            assert!(CZ.poly.contains(&Point::new(lon, lat)));
        }
    }

    #[test]
    fn distance_is_symmetric_and_sane() {
        let prague = (14.4378, 50.0755);
        let brno = (16.6068, 49.1951);
        let d = distance_km(prague, brno);
        assert!((d - 184.0).abs() < 5.0, "Prague-Brno was {d} km");
        assert!((d - distance_km(brno, prague)).abs() < 1e-9);
    }
}
