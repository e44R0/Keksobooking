import { renderAdPoiunts, resetMap } from "./map.js";

export const getAds = () => {
  fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      return response.json().then();
    })
    .then((data) => {
      console.log(data)
      return data;
    })
    .then((ads) => {renderAdPoiunts(ads)
    })
    .catch((error) => {
      alert('В ходе загрузки даннных возникла ошибка')
      // console.log("error:", error);
      // throw new Error("err2");
    });
};

export const postAd = (adForm) => {
  fetch ('https://28.javascript.htmlacademy.pro/keksobooking',
  {
    method: 'POST',
    body: adForm,
  })
  .then((response) => {
    if (response.ok) {
      resetMap();
      alert('Объявление отправлено успешно!');
    }
  })
}