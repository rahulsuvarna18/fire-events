import places from 'places.js';

const initCityAutoComplete = () => {
  const location_search = document.getElementById('search_query');
  if (location_search) {
    places({
      appId: process.env.ALGOLIA_APP,
      apiKey: process.env.ALGOLIA_KEY,
      container: location_search,
      templates: {
        value: function(suggestion) {
          return suggestion.name;
        }
      }
    }).configure({
    type: 'city',
    aroundLatLngViaIP: false,
  });
  }
};

export { initCityAutoComplete };

