const AD_QUANTITY = 10;
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLE = [
  'Посуточная аренда',
  'Квартира в аренду',
  'Продам квартиру',
  'Продам дом'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.'];
const DESCRIPTION = [
  'Уютная студия у метро. Wi-Fi.',
  'Центр. Просторная квартира. Парковка.',
  'Панорамный вид. Балкон. Тихий район.'];

let getRandomArrayElement = (array) => array[getRandInt(0, array.length - 1)];

let getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN
  }
  // min > max ? [min,max] = [max, min] : [min,max] = [min,max] ;  //Деструктурирование.. можно ли так или это несовсем корректно?
  const minCeiled = Math.ceil(Math.min(min,max));
  const maxFloored = Math.floor(Math.max(min,max));
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let getRandFloat = (min, max, accuracy = 1) => {
  if (min < 0 || max < 0 || accuracy < 0 ) {
    return NaN
  }
  const lower = Math.min(min,max);
  const upper = Math.max(min,max);
  return (Math.random() * (upper - lower) + lower).toFixed(accuracy);
}

const createAdData = (quantity) => ({
  author :  {
    avatar : `img/avatars/user${ quantity < 10 ? '0'.concat(quantity) : quantity }.png`
  },
  location : {
    lat : getRandFloat(35.65000,35.70000,5),
    lng : getRandFloat(139.70000,139.80000,5)
  },
  order : {
    title : getRandomArrayElement(TITLE),
    address : `${location.lat},${location.lng}`, //не работает =(
    price : getRandInt(1500,5000),
    type : getRandomArrayElement(APARTMENT_TYPE),
    rooms : getRandInt(1,5),
    guests : getRandInt(1,10),
    checkin : getRandomArrayElement(CHECK_TIME),
    checkout : getRandomArrayElement(CHECK_TIME),
    features : Array.from({length: getRandInt(1,APARTMENT_FEATURES.length - 1)}, () => getRandomArrayElement(APARTMENT_FEATURES)) ,
    description : getRandomArrayElement(DESCRIPTION),
    photos : getRandomArrayElement(PHOTOS),
  }
});

const generateData = Array.from({length: AD_QUANTITY}, (element,i) => createAdData( i + 1 ));

console.log(generateData);
