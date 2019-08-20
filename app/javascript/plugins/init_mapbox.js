import mapboxgl from 'mapbox-gl';
// var geojson = require('geojson-parser-js');

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 6000 });
};

import {Geojson} from 'geojson-parser-js';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10'
    });
    const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'top-left');

      map.on('load', function() {
// Add a geojson point source.
// Heatmap layers also work with a vector tile source.
map.addSource('earthquakes', {
"type": "geojson",
"data": "http://api.eventful.com/json/events/search?&location=paris&date=Future&app_key=f672q2vdWWFJVGmq"
});
let json = Geojson.parse("http://api.eventful.com/json/events/search?&location=paris&date=Future&app_key=f672q2vdWWFJVGmq")

console.log(json)

map.addLayer({
"id": "earthquakes-heat",
"type": "heatmap",
"source": "earthquakes",
"maxzoom": 9,
"paint": {
// Increase the heatmap weight based on frequency and property 2nitude
"heatmap-weight": [
"interpolate",
["linear"],
["get", "2"],
0, 0,
6, 1
],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
"heatmap-intensity": [
"interpolate",
["linear"],
["zoom"],
0, 1,
9, 3
],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
"heatmap-color": [
"interpolate",
["linear"],
["heatmap-density"],
0, "rgba(33,102,172,0)",
0.2, "rgb(103,169,207)",
0.4, "rgb(209,229,240)",
0.6, "rgb(253,219,199)",
0.8, "rgb(239,138,98)",
1, "rgb(178,24,43)"
],
// Adjust the heatmap radius by zoom level
"heatmap-radius": [
"interpolate",
["linear"],
["zoom"],
0, 2,
9, 20
],
// Transition from heatmap to circle layer by zoom level
"heatmap-opacity": [
"interpolate",
["linear"],
["zoom"],
7, 1,
9, 0
],
}
}, 'waterway-label');

map.addLayer({
"id": "earthquakes-point",
"type": "circle",
"source": "earthquakes",
"minzoom": 7,
"paint": {
// Size circle radius by earthquake 2nitude and zoom level
"circle-radius": [
"interpolate",
["linear"],
["zoom"],
7, [
"interpolate",
["linear"],
["get", "2"],
1, 1,
6, 4
],
16, [
"interpolate",
["linear"],
["get", "2"],
1, 5,
6, 50
]
],
// Color circle by earthquake 2nitude
"circle-color": [
"interpolate",
["linear"],
["get", "2"],
1, "rgba(33,102,172,0)",
2, "rgb(103,169,207)",
3, "rgb(209,229,240)",
4, "rgb(253,219,199)",
5, "rgb(239,138,98)",
6, "rgb(178,24,43)"
],
"circle-stroke-color": "white",
"circle-stroke-width": 1,
// Transition from heatmap to circle layer by zoom level
"circle-opacity": [
"interpolate",
["linear"],
["zoom"],
7, 0,
8, 1
]
}
}, 'waterway-label');
});

    const markers = JSON.parse(mapElement.dataset.markers);
  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
      fitMapToMarkers(map, markers);
  });
  }
};

export { initMapbox };












 const heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
  var zoom = map.getZoom();
  if (zoom > 12) {
    // hide the heatmap, show the markers
    heatmap.setMap(null);
    map.data.setMap(map);
  } else {
    // hide the markers, show the heatmap
    heatmap.setMap(map);
    map.data.setMap(null);
  }
})






    const contentString = '<p>Hello dawg!!!</p>'
    var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
