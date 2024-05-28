import { PRICE } from "./const.js";
const adForm = document.querySelector('.ad-form');
const pricePattern = /^[0-9]{1,6}$/;
const titlePattern = /[-а-яa-zё,\s]{30,100}$/i;
const capacityElement = adForm.querySelector('#capacity');
const roomNumberElement = adForm.querySelector('#room_number');
const priceElement = adForm.querySelector('#price');
const typeOfHousingElement = adForm.querySelector('#type');
const timeInElement = adForm.querySelector('#timein');
const timeOutElement = adForm.querySelector('#timeout');
let pricePlaceholder = Number(priceElement.getAttribute('placeholder'));

const changePlaceholder = () => {
    priceElement.setAttribute('placeholder', PRICE[typeOfHousingElement.value]);
}

export const setupValidation = () => {

    const pristine = new Pristine(adForm, {
        classTo: 'ad-form__element',
        errorTextParent: 'ad-form__element',
        errorTextClass: 'ad-form__element--invalid',
    });

    Pristine.setLocale('ru');

    Pristine.addMessages('ru', {
        required: 'Поле обязательно к заполнению'
    });

    const validateAdFormTitle = (value) => {
        return titlePattern.test(value);
    };

    const validateAdFormPrice = (value) => {
        const pricePlaceholder = Number(priceElement.getAttribute('placeholder'));
        return pricePlaceholder <= value && pricePattern.test(value) && value <= 100000;
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

    pristine.addValidator(
    adForm.querySelector('#price'),
    validateAdFormPrice,
    `Цена должна быть от ${pricePlaceholder} до 100000 ₽/ночь`
    );

    typeOfHousingElement.addEventListener('change', () => {
        changePlaceholder();
        pristine.validate();
    }
)

    capacityElement.addEventListener('change', () => {
        // console.log('capacityElement');
        // console.log(pricePlaceholder)
        pristine.validate();
    });

    roomNumberElement.addEventListener('change', () => {
        // console.log('roomNumberElement');
        pristine.validate();
    });


    timeInElement.addEventListener('change', () => {
        timeOutElement.value = timeInElement.value;
    });

    timeOutElement.addEventListener('change', () => {
        timeInElement.value = timeOutElement.value;
    });

    adForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const isValid = pristine.validate();
        if (!isValid) {
            console.log('>> Форма не валидна!');        
        } else {
            console.log('>> Успех!');
        }
    });  
};