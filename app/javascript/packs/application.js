import "bootstrap";
import { initCityAutoComplete } from '../plugins/init_autocomplete';
import { initHeatMap } from '../plugins/google_heatmaps';
import { googleAuthenticate } from '../components/google-login';
import { clusterMarkers } from '../plugins/google_heatmaps';
import { flatpickr } from '..plugins/flatpickr';


initHeatMap();
initCityAutoComplete();
googleAuthenticate();
flatpickr();
