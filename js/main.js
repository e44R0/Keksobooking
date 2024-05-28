import { generateData } from '../js/data.js'
import { renderCards } from '../js/markup.js';
import { disableAdForm, activateAdForm } from '../js/form.js';
import { setupValidation } from '../js/form-validation.js';


const adData = generateData();

renderCards(adData);
// disableAdForm();
setupValidation();