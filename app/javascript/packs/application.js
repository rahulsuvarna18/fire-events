import "bootstrap";
import { initCityAutoComplete } from '../plugins/init_autocomplete';
import { initHeatMap } from '../plugins/google_heatmaps';
import { googleAuthenticate } from '../components/google-login';
import { clusterMarkers } from '../plugins/google_heatmaps';
import { datepickr } from '../plugins/flatpickr';
import { typed } from "../plugins/typed";

import { collapsible } from '../components/collapsible';

initHeatMap();
initCityAutoComplete();
// googleAuthenticate();
// datepickr();
collapsible();
typed();
