
const getPoints = (markers) => {
  return markers.map((marker)=>{
    return new google.maps.LatLng(marker.lat, marker.lng)
  })
}

const getBounds = () => {
  let bounds = new google.maps.LatLngBounds();
  const mapElement = document.getElementById('map');
  const markers = JSON.parse(mapElement.dataset.markers);
  markers.forEach((marker)=>{
    bounds.extend(new google.maps.LatLng(marker.lat, marker.lng))
  })
  return bounds
}

const getMarkersMap = (map, markers) => {
  if (markers) {
    markers.forEach((marker) => {
      new google.maps.Marker({
        position: marker,
        map: map
      });
    })
  }
}

const getHeatMap = (map, markers) => {
 new google.maps.visualization.HeatmapLayer({
  data: getPoints(markers),
  map: map
});
}

function initHeatMap() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const markers = JSON.parse(mapElement.dataset.markers);
    const map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'satellite'
    });
    google.maps.event.addListener(map, 'zoom_changed', function() {
      var zoom = map.getZoom();
      if (zoom > 12) {
        getMarkersMap(map, markers)
      } else {
        getMarkersMap(null, null)
        getHeatMap(map, markers)
      }
    })
    map.fitBounds(getBounds()); //auto-zoom
    map.panToBounds(getBounds()); //auto-center
  };
}

export { initHeatMap };
