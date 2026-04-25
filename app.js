// Initialize map
const map = L.map('map').setView([37.8, -96], 4);

// Base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Example county metadata (expand later)
let countyData = {};

// Info box updater
function updateInfo(data) {
  const box = document.getElementById("info-box");

  if (!data) {
    box.innerHTML = "<h3>County Info</h3><p>No data available</p>";
    return;
  }

  const linkOrNA = (url) => {
    if (!url || url === "no data yet") return "N/A";
    return `<a href="${url}" target="_blank">${url}</a>`;
  };

  box.innerHTML = `
    <h3>${data.County || "Unknown County"}</h3>

    <p><strong>State:</strong> ${data.stateAbbreviation || "N/A"}</p>

    <hr>

    <p><strong>Court Website:</strong> ${linkOrNA(data.courtWebsite)}</p>
    <p><strong>Court Website 2:</strong> ${linkOrNA(data.courtWebsite2)}</p>

    <p><strong>County Clerk:</strong> ${linkOrNA(data.countyClerk)}</p>

    <p><strong>Secretary of State:</strong> ${linkOrNA(data.secretaryOfStateWebsite)}</p>

    <p><strong>Workers Comp:</strong> ${linkOrNA(data.workersCompWebsite)}</p>

    <hr>

    <p><strong>Notes:</strong> ${data.notes || "No notes"}</p>
  `;
}


const countyIndex = {};
let geojsonLayer;

// Load GeoJSON counties
Promise.all([
  fetch('counties.geojson').then(res => {
    if (!res.ok) throw new Error("GeoJSON failed to load");
    return res.json();
  }),
  fetch('countyData.json').then(res => {
    if (!res.ok) throw new Error("countyData.json failed to load");
    return res.json();
  })
])
.then(([geojson, data]) => {

  console.log("Loaded GeoJSON:", geojson);
  console.log("Loaded countyData:", data);

  countyData = data;

  L.geoJSON(geojson, {
    style: {
      color: "#555",
      weight: 1,
      fillOpacity: 0.3
    },

    onEachFeature: function (feature, layer) {
	  
          const skey =
            feature.properties.STATE + "" + feature.properties.COUNTY;
			
	  countyIndex[feature.properties.NAME.toLowerCase()] = {
		layer,
		key: skey,
		name: feature.properties.NAME
	  };
	  
	  layer.bindTooltip(feature.properties.NAME || feature.properties.County, {
	    permanent: false,
	    direction: "center",
	    className: "county-label"
	  });
	  

      layer.on({
        click: () => {

          const key =
            feature.properties.STATE + "" + feature.properties.COUNTY;

          console.log("CLICK KEY:", key);
          console.log("LOOKUP:", countyData[key]);

          updateInfo(countyData[key]);
        },

        mouseover: (e) => {
          e.target.setStyle({
            weight: 2,
            color: "#000",
            fillOpacity: 0.5
          });
        },

        mouseout: (e) => {
          e.target.setStyle({
            weight: 1,
            color: "#555",
            fillOpacity: 0.3
          });
        }
      });
    }

  }).addTo(map);
  
  document.getElementById("countySearch").addEventListener("keydown", (e) => {
	  if (e.key !== "Enter") return;

	  const query = e.target.value.trim().toLowerCase();

	  const match = countyIndex[query];

	  if (!match) {
		alert("County not found");
		return;
	  }

	  map.fitBounds(match.layer.getBounds(), {
		padding: [20, 20]
	  });

	  match.layer.openTooltip();

	  updateInfo(countyData[match.key]);
	});
  
  

})
.catch(err => {
  console.error("LOAD ERROR:", err);
});