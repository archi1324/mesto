import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(formSubmit, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.form');
        this._input = Array.from(this._form.querySelectorAll('.popup__input'));
        
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
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
            {this._formSubmit(evt, this._getInputValue());
            this.closePopup();
        }});
    }
}

export { PopupWithForm }