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

var stepMap = L.map('stepMap', {
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 1,
  scrollWheelZoom: false,
  zoomControl: true
});

// Add base tile layers
const tileMaps = [blankMap, breedingMap, pointsMap, climateMap, nonBreedingMap, iceMap, points2Map, stepMap];
tileMaps.forEach(function(map) {
  L.tileLayer('https://api.mapbox.com/styles/v1/smichalski/clgpx6cap00e901nn9jbi9fyt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pY2hhbHNraSIsImEiOiJjbDl6d2s0enYwMnI1M29uMDhzNXB0NTRlIn0.c1_vy157AkEEGNIfyQI9YQ', {
    maxZoom: 18,
  }).addTo(map);
});

// tern points down styling 
function styleTernPointsDown(feature) {
  return {
    radius: 4,
    fillColor: "white",
    color: "red",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  };
}

// climate zone polygon styling 
function styleClimateZone(feature) {
  const dn = feature.properties.DN;
  const colorMap = {
    1: '#a50026',
    2: '#d73027',
    3: '#f46d43',
    4: '#fdae61',
    5: '#fee090',
    6: '#ffffbf',
    7: '#e0f3f8',
    8: '#abd9e9',
    9: '#74add1',
    10: '#4575b4',
    11: '#313695',
    12: '#800080',
    13: '#FF00FF',
    14: '#00FFFF',
    15: '#008080',
    16: '#00FF00',
    17: '#ADFF2F',
    18: '#FFD700',
    19: '#FFA500',
    20: '#FF6347',
    21: '#CD5C5C',
    22: '#8B0000',
    23: '#2F4F4F',
    24: '#708090',
    25: '#000080',
    26: '#191970',
    27: '#483D8B',
    28: '#6A5ACD',
    29: '#7B68EE',
    30: '#9370DB'
  };

  return {
    fillColor: colorMap[dn] || '#cccccc',
    color: '#333',
    weight: 1,
    fillOpacity: 0.6
  };
}

// tern points up styling 
function styleTernPointsUp(feature) {
  return {
    radius: 4,
    fillColor: "red",
    color: "white",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  };
}
// Reusable data loader function for project (can accept style function)
function getData(map, url, iconUrl, customStyle) {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      L.geoJson(json, {
        style: customStyle,  // ← apply style if it's passed
        pointToLayer: function (feature, latlng) {
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
        onEachFeature: function (feature, layer) {
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
// style breeding range layer
getData(breedingMap, 'data/breeding-range.geojson', null, {
  color: "#1f78b4",          // outline color
  weight: 2,                 // outline thickness
  fillColor: "#444",      // fill color
  fillOpacity: 1           // fill transparency
});

// get first points layer
getData(pointsMap, 'data/tern-points-down.geojson', null, styleTernPointsDown);

// get climate zone data + style 
getData(climateMap, 'data/climate-zones.geojson', null, styleClimateZone);

// style non breeding range layer
getData(nonBreedingMap, 'data/non-breeding-range.geojson', null, {
  color: "#1f78b4",          // outline color
  weight: 2,                 // outline thickness
  fillColor: "#444",      // fill color
  fillOpacity: 1           // fill transparency
});

// get second points layer
getData(points2Map, 'data/tern-points-up.geojson', null, styleTernPointsUp);

// style sea ice layer 
getData(iceMap, 'data/sea-ice-trace.geojson', null, {
  color: "#1f78b4",          // outline color
  weight: 2,                 // outline thickness
  fillColor: "#444",      // fill color
  fillOpacity: 1           // fill transparency
});


//  Step-by-step point reveal for stepMap 
let stepFeatures = [];
let stepLayerGroup = L.layerGroup().addTo(stepMap);
let stepIndex = 0;

fetch('data/steps.geojson')
  .then(response => response.json())
  .then(data => {
    stepFeatures = data.features;

    const bounds = L.geoJSON(data).getBounds();
    stepMap.fitBounds(bounds);
  })
  .catch(error => console.error("Error loading steps.geojson:", error));

window.addEventListener("scroll", () => {
  if (stepIndex < stepFeatures.length) {
    const feature = stepFeatures[stepIndex];

    const layer = L.geoJSON(feature, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "white",
          color: "black",
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        });
      },
      onEachFeature: (feature, layer) => {
        let popupContent = "";
        for (let key in feature.properties) {
          popupContent += `<p><strong>${key}</strong>: ${feature.properties[key]}</p>`;
        }
        layer.bindPopup(popupContent);
      }
    });

    layer.addTo(stepLayerGroup);
    stepIndex++;
  }
});








/* arrow controls */
window.addEventListener("scroll", function () {
  const prompt = document.getElementById("scrollPrompt");
  if (prompt) {
    prompt.style.transition = "opacity 0.5s ease";
    prompt.style.opacity = "0";
    setTimeout(() => prompt.style.display = "none", 500);
  }
});


// Windy map interaction toggle buttons with styles and active state
document.addEventListener('DOMContentLoaded', function () {
  const windyMap = document.getElementById("windyMap");
  const iframeContainer = windyMap.querySelector(".iframe-container");

  const buttonContainer = document.createElement("div");
  buttonContainer.style.position = "absolute";
  buttonContainer.style.top = "10px";
  buttonContainer.style.left = "10px";
  buttonContainer.style.zIndex = "9999";
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";

  function createToggleButton(text) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.className = "windy-toggle-btn";
    return btn;
  }

  const enableBtn = createToggleButton("Enable Map Interaction");
  const disableBtn = createToggleButton("Disable Map Interaction");

  function setActive(btn) {
    enableBtn.classList.remove("active");
    disableBtn.classList.remove("active");
    btn.classList.add("active");
  }

  enableBtn.addEventListener("click", () => {
    iframeContainer.style.pointerEvents = "auto";
    setActive(enableBtn);
  });

  disableBtn.addEventListener("click", () => {
    iframeContainer.style.pointerEvents = "none";
    setActive(disableBtn);
  });

  // Set initial state
  disableBtn.classList.add("active");
  iframeContainer.style.pointerEvents = "none";

  buttonContainer.appendChild(enableBtn);
  buttonContainer.appendChild(disableBtn);
  windyMap.appendChild(buttonContainer);
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
