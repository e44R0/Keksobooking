import { generateData } from '../js/data.js'
import { renderCards } from './markup.js';

const adData = generateData();

renderCards(adData);
