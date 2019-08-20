
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
  let markers_array = []
  if (markers) {
    markers.forEach((marker) => {
      const mark = new google.maps.Marker({
        position: marker,
        map: map,
        visible: false,
      });
      const infowindow = new google.maps.InfoWindow({
          content: marker.infoWindow
      });
      mark.addListener('click', function() {
        infowindow.open(map, mark);
      });
      markers_array.push(mark)
    })
  }
  return markers_array
}


const getHeatMap = (map, markers) => {
 const heatmap = new google.maps.visualization.HeatmapLayer({
  data: getPoints(markers),
  map: map
});
 return heatmap
}

function initHeatMap() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const markers = JSON.parse(mapElement.dataset.markers);
    const map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'satellite'
    });

    const heatmap = getHeatMap(map, markers)
    const marker_list = getMarkersMap(map, markers);

    google.maps.event.addListener(map, 'zoom_changed', function() {
    let zoom = map.getZoom()
    if (zoom > 10){
      marker_list.forEach((m) => {
      m.setVisible(true);
     })
     heatmap.setMap(null)
    } else {
      marker_list.forEach((m) => {
      m.setVisible(false);
     })
      heatmap.setMap(map)
    }


      // ;
      // if (zoom > 10) {
      //   getMarkersMap(map, markers)
      //   infoPopup(map, markers)

      // } else {
      //   getMarkersMap(null, null)
      //
      // }
    })
    map.fitBounds(getBounds()); //auto-zoom
    map.panToBounds(getBounds()); //auto-center


  };
}

export { initHeatMap };
