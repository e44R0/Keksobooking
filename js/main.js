import { generateData } from '../js/data.js'
import { renderCards } from './markup.js';
import { disableAdForm, activateAdForm } from './form.js';


const adData = generateData();

renderCards(adData);
disableAdForm();