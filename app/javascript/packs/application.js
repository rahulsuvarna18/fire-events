import "bootstrap";
import { initCityAutoComplete } from '../plugins/init_autocomplete';
import { initHeatMap } from '../plugins/google_heatmaps';
import { googleAuthenticate } from '../plugins/google-login';

initHeatMap();
initCityAutoComplete();
googleAuthenticate();
