import { PRICE } from "./const.js";
import { updateSliderByHouseType } from '../js/noUiSlider.js';
import { disableSubmitButton, enableSubmitButton} from '../js/utils.js';
import { resetMap } from '../js/map.js';
import { postAd } from "./api.js";

const adForm = document.querySelector('.ad-form');
const pricePattern = /^[0-9]{1,6}$/;
const titlePattern = /[-а-яa-zё,\s]{30,100}$/i;
const capacityElement = adForm.querySelector('#capacity');
const roomNumberElement = adForm.querySelector('#room_number');
const priceElement = adForm.querySelector('#price');
const typeOfHousingElement = adForm.querySelector('#type');
const timeInElement = adForm.querySelector('#timein');
const timeOutElement = adForm.querySelector('#timeout');

priceElement.setAttribute('data-pristine-price','0');

const changePlaceholder = () => {
    priceElement.setAttribute('placeholder', PRICE[typeOfHousingElement.value]);
    priceElement.setAttribute('data-pristine-price', PRICE[typeOfHousingElement.value]);
    priceElement.setAttribute('min', PRICE[typeOfHousingElement.value]);
}

export const setupValidation = () => {
    const validateAdFormPrice = (value) => {
        const pricePlaceholder = Number(priceElement.getAttribute('placeholder'));
        return pricePlaceholder <= value && pricePattern.test(value) && value <= 100000;
    };


    const pristine = new Pristine(adForm, {
        classTo: 'ad-form__element',
        errorTextParent: 'ad-form__element',
        errorTextClass: 'ad-form__element--invalid',
    });

    Pristine.setLocale('ru');

    Pristine.addMessages('ru', {
        required: 'Поле обязательно к заполнению',
        default: 'Поле заполнено некорректно'
    });

    const validateAdFormTitle = (value) => {
        return titlePattern.test(value);
    };

    const validateRoomCapacityLimits = () => {
        const rooms = Number(roomNumberElement.value);
        const capacity = Number(capacityElement.value);

        if (capacity !== 0) {
            return capacity <= rooms && rooms !== 100;
        } 

        return rooms === 100;
    };

    pristine.addValidator(
        priceElement,
        validateAdFormPrice,
        () => `Цена должна быть от ${PRICE[typeOfHousingElement.value]} до 100000 ₽/ночь`
    );

    pristine.addValidator(
        adForm.querySelector('#room_number'),
        validateRoomCapacityLimits,
        'Неподходящее число комнат',
    );

    pristine.addValidator(
        adForm.querySelector('#capacity'),
        validateRoomCapacityLimits,
        'Неподходящее число гостей',
    );

    pristine.addValidator(
        adForm.querySelector('#title'),
        validateAdFormTitle,
        'От 30 до 100 символов'
    );

    typeOfHousingElement.addEventListener('change', () => {
        changePlaceholder();
        updateSliderByHouseType(PRICE[typeOfHousingElement.value]);
        pristine.validate();
    })

    capacityElement.addEventListener('change', () => {
        pristine.validate();
    });

    roomNumberElement.addEventListener('change', () => {
        pristine.validate();
    });


    timeInElement.addEventListener('change', () => {
        timeOutElement.value = timeInElement.value;
    });

    timeOutElement.addEventListener('change', () => {
        timeInElement.value = timeOutElement.value;
    });

    adForm.addEventListener('reset', () => {
        resetMap();
      });

    adForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const isValid = pristine.validate();
        if (!isValid) {
            console.log('>> Форма не валидна!');        
        } else {
            disableSubmitButton();
            const formData = new FormData(evt.target);
            postAd(formData,evt);
            console.log('>> Успех!');
        }
    });  
};


