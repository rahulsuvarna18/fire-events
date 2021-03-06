
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
  let info_window_array = []
  if (markers) {
    markers.forEach((marker) => {
      const mark = new google.maps.Marker({
        position: marker,
        map: map,
        icon: "https://res.cloudinary.com/dyigdenkz/image/upload/v1566361464/rsz_fire_1f525_ubebut.png",
        visible: false,
      });

      const infowindow = new google.maps.InfoWindow({
          content: marker.infoWindow
      });

      info_window_array.push(infowindow)
      // mark.addListener('mouseover', function() {
      //   infowindow.open(map, mark);
      // });
      mark.addListener('click', function() {
        info_window_array.forEach((info) => {
          info.close()
        })
        const higlitedCard = document.querySelector(".highlight")
        if (higlitedCard){
          higlitedCard.classList.remove("highlight")
        }

        infowindow.open(map, mark);
        const card = document.querySelector(`.card-category[data-lat="${this.position.lat()}"]`)
        card.scrollIntoView()
        document.getElementById("scrollingTable").scrollTop -= 20;
        card.classList.add("highlight")

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
 heatmap.set('radius', 20);
 return heatmap
}

function initHeatMap() {
  const mapElement = document.getElementById('map');
// Create a new StyledMapType object, passing it an array of styles,
//         and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
], {name: "styled_map"});

  if (mapElement) {
    const markers = JSON.parse(mapElement.dataset.markers);
    const map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'styled_map',
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    const heatmap = getHeatMap(map, markers)
    const marker_list = getMarkersMap(map, markers);

    const markersToggleShow = document.getElementById('toggle_markers_show');
    const markersToggleHide = document.getElementById('toggle_markers_hide');

    $(document).ready(function() {
      $("#toggle_markers_hide").hide();
    });

    if (markersToggleShow) {
      markersToggleShow.addEventListener('click', function() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      marker_list.forEach((m) => {
          m.setVisible(true);
         })
      $("#toggle_markers_hide").show();
      $("#toggle_markers_show").hide();
      });

      markersToggleHide.addEventListener('click', function() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      marker_list.forEach((m) => {
          m.setVisible(false);
         })
      $("#toggle_markers_hide").hide();
      $("#toggle_markers_show").show();
      });

    };

    const flipCard = document.querySelectorAll('.flip-card');

    if (flipCard) {
      flipCard.forEach((card) => {
        const latitude = card.querySelector('.card-category').dataset.lat
        const longitude = card.querySelector('.card-category').dataset.lng
        var latlng = new google.maps.LatLng(latitude, longitude);
        const focusMark = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: "https://res.cloudinary.com/dyigdenkz/image/upload/v1566361464/rsz_fire_1f525_ubebut.png",
          visible: false,
        });

        card.addEventListener('mouseover', function(e) {
          map.setCenter(latlng);
          map.setZoom(12);
          focusMark.setVisible(true);
        });
        card.addEventListener('mouseleave', function(e) {
          map.fitBounds(getBounds()); //auto-zoom
          map.panToBounds(getBounds()); //auto-center
          focusMark.setVisible(false);
        });
      });
    };

    const favouriteDashboard = document.querySelectorAll('.favourite-dashboard');

    if (favouriteDashboard) {
      favouriteDashboard.forEach((card) => {
        var latitude = card.attributes[1].value //the issue here is that it is not picking up the latitude or longitude frmo the event object (in ruby)
        var longitude = card.attributes[2].value
        var latlng = new google.maps.LatLng(latitude, longitude);
        const focusMark = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: "https://res.cloudinary.com/dyigdenkz/image/upload/v1566361464/rsz_fire_1f525_ubebut.png",
          visible: false,
        });

        card.addEventListener('mouseover', function(e) {
          map.setCenter(latlng);
          map.setZoom(12);
          focusMark.setVisible(true);
        });
        card.addEventListener('mouseleave', function(e) {
          map.fitBounds(getBounds()); //auto-zoom
          map.panToBounds(getBounds()); //auto-center
          focusMark.setVisible(false);
        });
      });
    };

    map.fitBounds(getBounds()); //auto-zoom
    map.panToBounds(getBounds()); //auto-center

  }
};

export { initHeatMap };

