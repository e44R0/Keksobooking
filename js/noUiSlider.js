const priceElement = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');

priceElement.value = 10;

export const addNoUiSlider = () => {
    noUiSlider.create(sliderElement, {
        range: {
            min: 0,
            max: 100000,
        },
        start: 1000,
        step: 100,
        connect: 'lower',
        format: {
            to: function (value) {
                if (Number.isInteger(value)) {
                    return value;
                };
                return value.toFixed(0);
            },
            from: function (value) {
                return parseFloat(value);
            },
        },
    });

    sliderElement.noUiSlider.on('update', () => {
        priceElement.value = sliderElement.noUiSlider.get();
    });
    
};

export const updateSliderByHouseType = (value) => {
    sliderElement.noUiSlider.updateOptions({
        range: {
            min: value,
            max: 100000
        },
        start: value,
        step: 100
        });
};

export const disableSlider = () => {
    sliderElement.setAttribute('disabled','disabled');
};

export const enableSlider = () => {
    sliderElement.removeAttribute('disabled');
};