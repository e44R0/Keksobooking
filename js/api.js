import { renderAdPoiunts, resetMap } from "../js/map.js";
import { showAlert ,enableSubmitButton } from '../js/utils.js';
import { showMessage } from '../js/message.js';

export const getAds = () => {
  fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      return data;
    })
    .then((ads) => {renderAdPoiunts(ads)
    })
    .catch(() => {
      showAlert('Ошибка загрузки объявлений..');
      // alert('В ходе загрузки даннных возникла ошибка')
      // console.log("error:", error);
      // throw new Error("err2");
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