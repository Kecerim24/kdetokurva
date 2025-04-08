const script = document.querySelector("#panoScript");
const API_KEY = 'BFaiuQHw2KOQH7m6gQbkyEkTRDwGd6TmusYAxnRPsyk';

async function main() {
    const locationData = await getRandomLocation();

    var panoData = await createPano(locationData);
    while (panoData.error) {
        const panoCont = document.getElementById('panoCont');
        while (panoCont.firstChild) {
            panoCont.removeChild(panoCont.firstChild);
        }
        const locationData = await getRandomLocation();
        panoData = await createPano(locationData);
    }


    const map = L.map('map').setView([49.8022514, 15.485], 7);

    /*
    We store all our tile layers in an object, because we will
    need to pass that to the layers switching map control.
    */
    const tileLayers = {
        'Basic': L.tileLayer(`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Outdoor': L.tileLayer(`https://api.mapy.cz/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
        'Winter': L.tileLayer(`https://api.mapy.cz/v1/maptiles/winter/256/{z}/{x}/{y}?apikey=${API_KEY}`, {
            minZoom: 6,
            maxZoom: 19,
            attribution: '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }),
    };

    /*
    Then we add the first raster tile layer to the map.
    See https://leafletjs.com/reference.html#tilelayer
    */
    tileLayers['Outdoor'].addTo(map);

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
    const logoControl = new LogoControl().addTo(map);
    var marker = L.marker([panoData.lat, panoData.lon]).addTo(map);

}

async function getRandomLocation() {
    try {
        const response = await fetch('/api/random-location');
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


async function createPano(locationData) {
    const container = document.querySelector("#panoCont");
    const infoContainer = document.querySelector("#infoCont");

    infoContainer.textContent = "Loading pano from position...";

    const panoData = await Panorama.panoramaFromPosition({
        // Generate random coordinates within Czechia's rough bounding box

        parent: container,
        // WGS84 lon/lat
        lon: locationData.lon,
        lat: locationData.lat,
        // api key
        apiKey: API_KEY,
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

script.addEventListener("load", () => {
    main();
});


