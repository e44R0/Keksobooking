import { createFeatureList } from '../js/utils.js';
import { generateData } from '../js/data.js';
import { AD_TIPE } from "./const.js";

const adressElement = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],

});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],
})

const mainMarker = L.marker({
    lat: 35.6898,
    lng: 139.7539,
    },
    {
    draggable: true,
    icon: mainPinIcon,
    },
);

const map = L.map('map-canvas').setView({
    lat: 35.6898,
    lng: 139.7539,
}, 12);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);



mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const lat = coordinates.lat.toFixed(5);
  const lng = coordinates.lng.toFixed(5);
  adressElement.value = `${lat}, ${lng}`;
  // console.log(evt.target.getLatLng());
});

const adPoints = generateData();
console.log(adPoints);

console.log(adPoints[0].location.lat);
console.log(adPoints[0].location.lng);




const createAdPopup = (ad) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = ad.author.avatar;
  popupElement.querySelector('.popup__title').textContent = ad.order.title;
  popupElement.querySelector('.popup__text--address').textContent = ad.order.address;
  popupElement.querySelector('.popup__text--price span').textContent = ad.order.price;
  popupElement.querySelector('.popup__type').textContent = AD_TIPE[ad.order.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${ad.order.rooms} комнаты для ${ad.order.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.order.checkin}, выезд до ${ad.order.checkout} гостей`;
  createFeatureList(popupElement,'popup__feature',ad.order.features);

  return popupElement;
};

const markersGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {lat,lng} = ad.location;
  const adMarker = L.marker({
    lat: lat,
    lng: lng,
    },
    {
      icon: pinIcon,
    },
   );

   adMarker
    .addTo(markersGroup)
    .bindPopup(createAdPopup(ad))
};


adPoints.forEach((ad) => {
  createMarker(ad);
});  