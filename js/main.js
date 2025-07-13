
// Initialize Mapbox GL JS map
// mapboxgl.accessToken = 'pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ';
// const mapboxMap = new mapboxgl.Map({
  // container: 'background-map',
  // style: 'mapbox://styles/mapbox/light-v11',
  // center: [-45, 75],
  // zoom: 2
// });



// Initialize maps
var firstMap = L.map('firstMap', {
  center: [0, 0],  // Center of the world
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var secondMap = L.map('secondMap', {
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

var thirdMap = L.map('thirdMap', {
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

L.tileLayer('https://api.mapbox.com/styles/v1/smichalski/clgpx6cap00e901nn9jbi9fyt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ', {
  maxZoom: 18,
}).addTo(thirdMap);

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
    }).addTo(firstMap);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));


/* arrow controls */
window.addEventListener("scroll", function () {
  const prompt = document.getElementById("scrollPrompt");
  if (prompt) {
    prompt.style.transition = "opacity 0.5s ease";
    prompt.style.opacity = "0";
    setTimeout(() => prompt.style.display = "none", 500);
  }
});


// Chart.js: Migration distances by species
document.addEventListener('DOMContentLoaded', function () {
  const chartCanvas = document.getElementById('migrationChart');
  if (!chartCanvas) return;  // Exit if chart container doesn't exist

  const ctx = chartCanvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Arctic Tern', 'Wildebeest', 'Monarch Butterfly', 'Salmon', 'Gray Whale'],
      datasets: [{
        label: 'Annual Migration Distance (miles)',
        data: [44000, 1000, 3000, 2500, 10000],
        backgroundColor: 'rgba(93, 173, 226, 0.6)',
        borderColor: 'rgba(93, 173, 226, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.formattedValue} mi`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Miles'
          }
        }
      }
    }
  });
});








