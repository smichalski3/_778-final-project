// Define all your maps first
var blankMap = L.map('blankMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var breedingMap = L.map('breedingMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var pointsMap = L.map('pointsMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var climateMap = L.map('climateMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var nonBreedingMap = L.map('nonBreedingMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var iceMap = L.map('iceMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

var points2Map = L.map('points2Map', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

// Add base tile layers
const tileMaps = [blankMap, breedingMap, pointsMap, climateMap, nonBreedingMap, iceMap, points2Map];
tileMaps.forEach(function(map) {
  L.tileLayer('https://api.mapbox.com/styles/v1/smichalski/clgpx6cap00e901nn9jbi9fyt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ', {
    maxZoom: 18,
  }).addTo(map);
});

// Load and style the breeding-range.geojson as a polygon layer
fetch('data/breeding-range.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#1f78b4",          // outline color
          weight: 2,                 // outline thickness
          fillColor: "#a6cee3",      // fill color
          fillOpacity: 1           // fill transparency
        };
      },
      onEachFeature: function (feature, layer) {
        let popupContent = "";
        for (let prop in feature.properties) {
          popupContent += `<p><strong>${prop}</strong>: ${feature.properties[prop]}</p>`;
        }
        layer.bindPopup(popupContent);
      }
    }).addTo(breedingMap);
  })
  .catch(error => console.error('Error loading breeding-range.geojson:', error));


// Reusable data loader function for Tern project
function getData(map, url, iconUrl) {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      L.geoJson(json, {
        pointToLayer: function(feature, latlng) {
          if (iconUrl) {
            var customIcon = L.icon({
              iconUrl: iconUrl,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });
            return L.marker(latlng, { icon: customIcon });
          } else {
            return L.circleMarker(latlng, {
              radius: 6,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        },
        onEachFeature: function(feature, layer) {
          let popupContent = "";
          for (let property in feature.properties) {
            popupContent += `<p><strong>${property}</strong>: ${feature.properties[property]}</p>`;
          }
          layer.bindPopup(popupContent);
        }
      }).addTo(map);
    })
    .catch(error => console.error(`Error loading ${url}:`, error));
}

// Load data layers onto the maps
getData(breedingMap, 'data/breeding-range.geojson');
getData(pointsMap, 'data/tern-points-down.geojson');
getData(climateMap, 'data/climate-zones.geojson');
getData(nonBreedingMap, 'data/non-breeding-range.geojson');
getData(iceMap, 'data/tern-lines.geojson');
getData(points2Map, 'data/tern-points-up.geojson');

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
