import { disableSlider, enableSlider } from "../js/noUiSlider.js";
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.querySelectorAll('.map__filter');

export const disableAdForm = () => {
    adForm.classList.add('ad-form--disabled');
    adFormElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
    filterForm.classList.add('ad-form--disabled');
    filterFormElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
    disableSlider();
};

export const activateAdForm = () => {
    adForm.classList.remove('ad-form--disabled');
    adFormElements.forEach((element) => element.removeAttribute('disabled'));
    filterForm.classList.remove('ad-form--disabled');
    filterFormElements.forEach((element) => element.removeAttribute('disabled'));
    enableSlider();
};