import { generateData } from '../js/data.js'
import { renderCards } from './markup.js';
import { disableAdForm, activateAdForm } from './form.js';
import '../js/form-validation.js';


const adData = generateData();

renderCards(adData);
// disableAdForm();