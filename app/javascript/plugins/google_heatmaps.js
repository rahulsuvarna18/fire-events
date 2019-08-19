
     const getPoints = () => {
      const mapElement = document.getElementById('map');
      const markers = JSON.parse(mapElement.dataset.markers);

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


      function initHeatMap() {
       const map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: 'satellite'
        });

         var uluru = {lat: 51.5074, lng: 0.1278};



       const marker = new google.maps.Marker({
        position: uluru,
        map: map
       });



       const heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });


      map.fitBounds(getBounds()); //auto-zoom
      map.panToBounds(getBounds()); //auto-center
 }

 function clusterMarkers() {

      const map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: 'satellite'
        });

        const marker = new google.maps.Marker({
        data: getPoints(),
        map: map
       });


      map.fitBounds(getBounds()); //auto-zoom
      map.panToBounds(getBounds()); //auto-center
      }






export {initHeatMap};
export {clusterMarkers};
