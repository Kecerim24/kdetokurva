
const script = document.querySelector("#panoScript");
const API_KEY = 'BFaiuQHw2KOQH7m6gQbkyEkTRDwGd6TmusYAxnRPsyk';

fetch('czech_republic.json')
  .then(response => response.json())
  .then(czechGeoJSON => {
    let point;
    do {
        point = turf.point([
            Math.random() * (-66.934570 + 125.000000) - 125.000000,
            Math.random() * (49.384358 - 24.396308) + 24.396308
        ]);
    } while (!turf.booleanPointInPolygon(point, czechGeoJSON));

    console.log(point.geometry.coordinates);
  });


async function createPano() {
    const container = document.querySelector("#panoCont");
    const infoContainer = document.querySelector("#infoCont");

    // after scrdis = "Loading pano from position...";ipt load -> window.Panorama namespace
    infoContainer.textContent = "Loading pano from position...";

    const panoData = await Panorama.panoramaFromPosition({

        // Generate random coordinates within Czechia's rough bounding box
        
        parent: container,
        // WGS84 lon/lat
        lon: 13.410529,
        lat: 49,
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

    infoContainer.textContent = panoData.error;
    console.log(panoData.info.lon, panoData.info.lat);
    // Modify the pano-logo link URL
}

script.addEventListener("load", () => {
    const infoContainer = document.querySelector("#infoCont");

    infoContainer.textContent = "Script is loaded";

    createPano();
    document.getElementsByClassName("pano-logo").item(0).children[0].href = "https://www.google.com";
});


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
