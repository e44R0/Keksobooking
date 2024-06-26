import { renderAdPoiunts, resetMap } from "../js/map.js";
import { showAlert ,enableSubmitButton } from '../js/utils.js';
import { showMessage } from '../js/message.js';
import { getFilteredOffers, setOnFilterChange } from './filter.js';
import { debounce } from '../js/debounce.js';

export const getAds = () => {
  fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      return data;
    })
    .then((ads) => {
      getFilteredOffers(ads);
      renderAdPoiunts(ads.slice(0,10));
      setOnFilterChange(debounce(() => renderAdPoiunts(getFilteredOffers(ads))));
    })
    .catch(() => {
      showAlert('Ошибка загрузки объявлений..');
    });
};

export const postAd = (formData,evt) => {
  fetch ('https://28.javascript.htmlacademy.pro/keksobooking',
  {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      showMessage('success');
      evt.target.reset();
      resetMap();
    } else {
      showMessage('error');
    }
  }).catch(() => {
    enableSubmitButton()
      showMessage('error');
  }).finally(()=>{
      enableSubmitButton();
  })
}