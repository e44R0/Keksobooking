import { disableAdForm,} from '../js/form.js';
import { setupValidation } from '../js/form-validation.js';
import { initMap, renderAdPoiunts } from  '../js/map.js';
import { addNoUiSlider } from '../js/noUiSlider.js';
import { getAds } from './api.js';


disableAdForm();
initMap();
getAds();
addNoUiSlider();
setupValidation();
