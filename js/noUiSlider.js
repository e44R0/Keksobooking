const priceElement = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');

priceElement.value = 0;

export const addNoUiSlider = () => {
    noUiSlider.create(sliderElement, {
        range: {
            min: 0,
            max: 100000,
        },
        start: 0,
        step: 1,
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
        console.log('slider updated');
        console.log("input:", priceElement.value, "slider:", sliderElement.noUiSlider.get());
        priceElement.value = sliderElement.noUiSlider.get();
    });
    
};

priceElement.addEventListener('input', (evt)=> {
    console.log('input updated');
    console.log("input:", priceElement.valueAsNumber, "slider:", sliderElement.noUiSlider.get());
    sliderElement.noUiSlider.setHandle(0,evt.target.valueAsNumber,false, true);
})


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