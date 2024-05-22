const adForm = document.querySelector('.ad-form');
const pricePattern = /^[1-9]$|^[1-9][0-9]{1,5}$/;
const titlePattern = /[-a-zа-яё,\s]{30,100}$/i;

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
    return pricePattern.test(value) && value <= 100000;
};

const validateAdFormRooms = (value) => {
    const countRoom = adForm.querySelector('#capacity');
    switch (value) {
        case '1':
            return countRoom.value === '1';
        case '2':
            return countRoom.value === '1' || countRoom.value === '2';
        case '3':
            return countRoom.value === '1' || countRoom.value === '2' || countRoom.value === '3';
        case '100':
            return countRoom.value === '0';
    }
};

const validateAdFormCapacity = (value) => {
    const rooms = adForm.querySelector('#room_number');
    const countRooms = Number(rooms.value);
    if (Number(value) !== 0) {
        return Number(value) <= countRooms && countRooms !== 100;
    } else {
        return countRooms === 100;
    }
};

pristine.addValidator(
    adForm.querySelector('#room_number'),
    validateAdFormRooms,
    'Неподходящее число комнат',
);

pristine.addValidator(
    adForm.querySelector('#capacity'),
    validateAdFormCapacity,
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
    'До 100000 ₽/ночь'
  );

adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
        console.log('>> Форма не валидна!');        
    } else {
        console.log('>> Успех!');
    }
})
