export const getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN
  }
  const minCeiled = Math.ceil(Math.min(min,max));
  const maxFloored = Math.floor(Math.max(min,max));
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const getRandFloat = (min, max, accuracy = 1) => {
  if (min < 0 || max < 0 || accuracy < 0 ) {
    return NaN
  }
  const lower = Math.min(min,max);
  const upper = Math.max(min,max);
  return (Math.random() * (upper - lower) + lower).toFixed(accuracy)
}

export const getRandomArrayElement = (array) => array[getRandInt(0, array.length - 1)];

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(255, 255, 128, .5)';
  alertContainer.style.fontSize = '14px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

export const isEnterKey = (evt) => {
  return evt.key === 'Enter';
};

export const createFeatureList = function (element, className, featuresList) {
  const featuresListItem = element.querySelectorAll(`.${className}`);
  featuresListItem.forEach((featuresListElement) => {
    const isNecessary = featuresList?.some((feature) => featuresListElement.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary){
      featuresListElement.remove();
    }
  });
};

export const createTextContent = function (element, className, content) {
  if (content === '') {
    element.querySelector(`.${className}`).classList.add('visually-hidden');
  } else {
    element.querySelector(`.${className}`).textContent = content;
    }
};

export const createImgSrc = function (element, className, content) {
  if (content === '') {
    element.querySelector(`.${className}`).classList.add('visually-hidden');
  } else {
    element.querySelector(`.${className}`).src = content;
    }
};

export const disableSubmitButton = () => {
  const submitButton = document.querySelector('.ad-form__submit');
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = 'Отправляю..';
};

export const enableSubmitButton = () => {
  const submitButton = document.querySelector('.ad-form__submit');
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Опубликовать';
};