import { createFeatureList, createTextContent , createImgSrc} from "../js/utils.js";
import { generateData } from "../js/data.js";
import { AD_TIPE } from "./const.js";
import { activateAdForm, disableAdForm } from "../js/form.js";

const adressElement = document.querySelector("#address");
const map = L.map("map-canvas");

const mainPinIcon = L.icon({
  iconUrl: "../img/main-pin.svg",
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.6898,
    lng: 139.7539,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

export const initMap = () => {
  
  map
    .on("load", () => {
      console.log("form activated");
      activateAdForm();
    })
    .setView(
      {
        lat: 35.6898,
        lng: 139.7539,
      },
      12
    );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  }).addTo(map);

  mainMarker.addTo(map);

  mainMarker.on("moveend", (evt) => {
    const coordinates = evt.target.getLatLng();
    const lat = coordinates.lat.toFixed(5);
    const lng = coordinates.lng.toFixed(5);

    adressElement.value = `${lat}, ${lng}`;
  });

  
};

const pinIcon = L.icon({
  iconUrl: "../img/pin.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markersGroup = L.layerGroup().addTo(map);

const adPoints = generateData();

const createAdPopup = (ad) => {
  const popupTemplate = document.querySelector("#card").content.querySelector(".popup");
  const popupElement = popupTemplate.cloneNode(true);

  createImgSrc(popupElement, 'popup__avatar', ad.author.avatar);
  createTextContent(popupElement, 'popup__title', ad.offer.title);
  createTextContent(popupElement, 'popup__text--address', ad.offer.address);
  createTextContent(popupElement, 'popup__text--price span', ad.offer.price);
  createTextContent(popupElement, 'popup__type', AD_TIPE[ad.offer.type]);
  createTextContent(popupElement, 'popup__text--capacity', `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  createTextContent(popupElement, 'popup__text--time', `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout} гостей`);
  createFeatureList(popupElement, "popup__feature", ad.offer.features || []);

  // 0 || "default" -> "default"
  return popupElement;
};

const adMarker = (ad) => {
  const { lat, lng } = ad.location;
  const adMarker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    }
  );

  adMarker.addTo(markersGroup)
  adMarker.bindPopup(createAdPopup(ad));
};

export const renderAdPoiunts = (ads) => {
  ads.forEach((ad) => {
    adMarker(ad);
  });
};

export const resetMap = () => {
  mainMarker.setLatLng({
    lat: 35.6898,
    lng: 139.7539,
  });
  map.setView({
    lat: 35.6898,
    lng: 139.7539,
  }, 12);
  map.closePopup();
};
