import { AD_QUANTITY, CHECK_TIME, APARTMENT_TYPE, APARTMENT_FEATURES, TITLE, PHOTOS, DESCRIPTION } from '../js/const.js'
import { getRandFloat, getRandInt, getRandomArrayElement } from './utils.js'

const createAdData = (quantity) => {

  const location = {
    lat : getRandFloat(35.65000,35.70000,5),
    lng : getRandFloat(139.70000,139.80000,5)
  }

  return {
    author :  {
      avatar : `img/avatars/user${ `${quantity}`.padStart(2, '0') }.png`
    },
    location : {
      lat : location.lat,
      lng : location.lng,
    },
    order : {
      title : getRandomArrayElement(TITLE),
      address : `${location.lat},${location.lng}`,
      price : getRandInt(1500,5000),
      type : getRandomArrayElement(APARTMENT_TYPE),
      rooms : getRandInt(1,5),
      guests : getRandInt(1,10),
      checkin : getRandomArrayElement(CHECK_TIME),
      checkout : getRandomArrayElement(CHECK_TIME),
      features : Array.from({length: getRandInt(1,APARTMENT_FEATURES.length - 1)}, () => getRandomArrayElement(APARTMENT_FEATURES)) ,
      description : getRandomArrayElement(DESCRIPTION),
      photos : Array.from({length: getRandInt(1,PHOTOS.length - 1)}, () => getRandomArrayElement(PHOTOS)) ,
    }
  }
}

export const generateData = () => Array.from({length: AD_QUANTITY}, (element,i) => createAdData( i + 1 ));