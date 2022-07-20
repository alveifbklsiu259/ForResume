//Making a map and tiles
const map = L.map('issmap').setView([0, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: '© OpenStreetMap',
}).addTo(map);
map.setMaxBounds([[300, -60], [-360, 360]]);

//Creating a marker with a custom icon
const issIcon = L.icon({
    iconUrl: 'iss320.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

//Get latitude and longitude using fetch
let firstTime = true;
async function getISS() {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    const {latitude, longitude} = data;
    marker.setLatLng([latitude, longitude]).addTo(map);
    if (firstTime) {
        map.setView([latitude, longitude], 2);
        firstTime = false;
    }
    document.querySelector('#lad').textContent = latitude.toFixed(2);
    document.querySelector('#lon').textContent = longitude.toFixed(2);
};

getISS();
setInterval(getISS, 1000);
