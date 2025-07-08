
// Initialize Mapbox GL JS map
// mapboxgl.accessToken = 'pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ';
// const mapboxMap = new mapboxgl.Map({
  // container: 'background-map',
  // style: 'mapbox://styles/mapbox/light-v11',
  // center: [-45, 75],
  // zoom: 2
// });



// Initialize the maps

var firstMap = L.map('firstMap', {
  center: [64, -150],  // Center on interior Alaska
  zoom: 4,
  maxZoom: 18,
  minZoom: 3,
  scrollWheelZoom: false,
  zoomControl: true,
  maxBounds: [
      [72, -130],  // North-East corner
      [54, -170]   // South-West corner
  ],
});

var secondMap = L.map('secondMap', {
  center: [61.2176, -149.8997],  // Anchorage, Alaska
  zoom: 10,                      // Good level for city detail
  maxZoom: 18,
  minZoom: 4,
  scrollWheelZoom: false,
  zoomControl: true,
  maxBounds: [
    [62.5, -148],  // North-East boundary
    [60, -152]     // South-West boundary
  ],
});


// Add base tilelayer to the maps
L.tileLayer('https://api.mapbox.com/styles/v1/smichalski/clgpx6cap00e901nn9jbi9fyt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ', {
  maxZoom: 18,
}).addTo(firstMap);

L.tileLayer('https://api.mapbox.com/styles/v1/smichalski/clgpx6cap00e901nn9jbi9fyt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ', {
  maxZoom: 18,
}).addTo(secondMap);

// Load GeoJSON point onto secondMap
fetch('data/tern.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description || ''}`);
        }
      }
    }).addTo(secondMap);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));










