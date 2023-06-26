import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor({formSubmit}, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.form');
        this._input = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._submitText = this._submitButton.textContent;
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitText;
        }
    }

    openPopup(){
        super.openPopup();
    }

    _getInputValue() {
        this._inputValues = {};
        this._input.forEach((input) => 
        (this._inputValues[input.name] = input.value));
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(evt, this._getInputValue());
    });
    }
}

export { PopupWithForm }