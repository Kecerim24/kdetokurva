async function main() {
    const apiKey = await fetch('/api/api-key').then(res => res.text()); // jednoho krásného dne bude api klíč giga tajnej, ale dnes to nebude

    const locationData = await getRandomLocation();
    var panoData = await createPano(locationData, apiKey); // Pass API key

    while (panoData.error) {
        const panoCont = document.getElementById('panoCont');
        while (panoCont.firstChild) {
            panoCont.removeChild(panoCont.firstChild);
        }
        const locationData = await getRandomLocation();
        panoData = await createPano(locationData, apiKey); // Pass API key
    }

    // Create map and center it on center of Czechia
    const map = L.map('map').setView([49.8175, 15.4730], 7);

    /*
    We store all our tile layers in an object, because we will
    need to pass that to the layers switching map control.
    */
    const tileLayers = {
        'Základní': L.tileLayer(`/api/tiles/basic/{z}/{x}/{y}`, { // Use backend proxy
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Turistická': L.tileLayer(`/api/tiles/outdoor/{z}/{x}/{y}`, { // Use backend proxy
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Zimní': L.tileLayer(`/api/tiles/winter/{z}/{x}/{y}`, { // Use backend proxy
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
    };

    /*
    Then we add the first raster tile layer to the map.
    See https://leafletjs.com/reference.html#tilelayer
    */
    tileLayers['Turistická'].addTo(map);

    // Leaflet has a built-in map control for switching layers.
    L.control.layers(tileLayers).addTo(map);


    /*
    We also require you to include our logo somewhere over the map.
    We create our own map control implementing a documented interface,
    that shows a clickable logo.
    See https://leafletjs.com/reference.html#control
    */
    const LogoControl = L.Control.extend({
        options: {
            position: 'bottomleft',
        },

        onAdd: function (map) {
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

    // Add click handler to create markers on map click
    let guessMarker = null;
    map.on('click', function (e) {
        // Remove existing marker if there is one
        if (guessMarker) {
            map.removeLayer(guessMarker);
        }

        // Create new marker at clicked location
        guessMarker = L.marker(e.latlng).addTo(map);
        document.getElementById('confirmButton').style.display = 'block';
    });

    document.getElementById('confirmButton').addEventListener('click', async function () {
        var finalFlagIcon = L.icon({
            iconUrl: 'final_flag.svg',
            iconAnchor: [0, 48],
        });
        const startMarker = L.marker([panoData.lat, panoData.lon], { icon: finalFlagIcon }).addTo(map);
        var polyline = L.polyline([[panoData.lat, panoData.lon], [guessMarker.getLatLng().lat, guessMarker.getLatLng().lng]], { color: 'red' }).addTo(map);
        // Get distance between guess and actual location
        const response = await fetch('/api/distance.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat1: panoData.lat,
                lon1: panoData.lon,
                lat2: guessMarker.getLatLng().lat,
                lon2: guessMarker.getLatLng().lng
            })
        });
        const distanceData = await response.json();
        const resultBanner = document.getElementById('resultBanner');
        resultBanner.textContent = `Vzdálenost: ${distanceData.distance_km.toFixed(3)} km`;
        resultBanner.style.display = 'block';
        document.getElementById('confirmButton').style.display = 'none';

        // Hide the banner after 4 seconds
        setTimeout(async () => {
            resultBanner.style.display = 'none';
            // Reset everything
            map.removeLayer(startMarker);
            map.removeLayer(guessMarker);
            map.removeLayer(polyline);
            map.setView([49.8175, 15.4730], 7);
            document.getElementById('confirmButton').style.display = 'none';
            while (panoCont.firstChild) {
                panoCont.removeChild(panoCont.firstChild);
            }
            // Get new location and create new panorama
            const locationData = await getRandomLocation();
            panoData = await createPano(locationData, apiKey);
            while (panoData.error) {
                while (panoCont.firstChild) {
                    panoCont.removeChild(panoCont.firstChild);
                }
                const locationData = await getRandomLocation();
                panoData = await createPano(locationData, apiKey);
            }
        }, 4000);
    });
}

main();

async function getRandomLocation() {
    try {
        const response = await fetch('/api/random-location.json');
        if (!response.ok) {
            throw new Error('Failed to fetch random location');
        }
        return await response.json();
    } catch (error) {
        console.error('Error getting random location:', error);
        return {
            lon: 0,
            lat: 0
        };
    }
}

async function createPano(locationData, apiKey) { // Added apiKey parameter
    const container = document.querySelector("#panoCont");
    const infoContainer = document.querySelector("#infoCont");

    infoContainer.textContent = "Loading pano from position...";

    const panoData = await Panorama.panoramaFromPosition({
        parent: container,
        // WGS84 lon/lat
        lon: locationData.lon,
        lat: locationData.lat,
        // api key
        apiKey: apiKey, // Use passed apiKey
        // optional view params
        yaw: 5.43,
        pitch: Math.PI / 6,
        fov: Math.PI / 1,
        radius: 1000,
        // show navigation - pano neighbors, click mask
        showNavigation: true,
    });

    console.log("error: ", panoData.error);
    //console.log("generated coordinates: ", locationData.lon, locationData.lat);
    //console.log("panorama coordinates: ", panoData.info.lon, panoData.info.lat);
    return {
        lon: panoData.error ? 0 : panoData.info.lon,
        lat: panoData.error ? 0 : panoData.info.lat,
        error: panoData.error
    };
}



