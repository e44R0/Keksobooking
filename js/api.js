import { renderAdPoiunts } from "./map.js";

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
      console.log("error:", error);
      throw new Error("err2");
    });
};
