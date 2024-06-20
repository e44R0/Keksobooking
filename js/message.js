import {isEscapeKey, isEnterKey, enableSubmitButton} from '../js/utils.js';

const event = () => {
  if (isEscapeKey || isEnterKey) {
    document.body.lastChild.remove();
    window.removeEventListener('keydown', event);
    enableSubmitButton();
  }
};

const addEvent = () => {
  window.addEventListener('keydown', event);
  window.onclick = () => document.body.lastChild.remove();
};

export const showMessage = (className) => {
  const template = document.querySelector(`#${className}`).content.querySelector(`.${className}`);
  const element = template.cloneNode('true');
  document.body.appendChild(element);
  addEvent();
};