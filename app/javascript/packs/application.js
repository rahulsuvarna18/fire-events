import "bootstrap";
import { initCityAutoComplete } from '../plugins/init_autocomplete';
import { initHeatMap } from '../plugins/google_heatmaps';
import { googleAuthenticate } from '../plugins/google-login';
import { clusterMarkers } from '../plugins/google_heatmaps';


initHeatMap();
clusterMarkers();
initCityAutoComplete();
googleAuthenticate();
