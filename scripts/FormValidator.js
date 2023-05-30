class FormValidator {
    constructor(validationConfig, form) {
        this.config = validationConfig;
        this._form = form;
    }

    _openError = (input, errorMessage) => {
        const errorContainer = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this.config.inputErrorClass);
        errorContainer.classList.add(this.config.errorClass);
        errorContainer.textContent = errorMessage;
    }

    _hideError = (input) => {
        const errorContainer = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this.config.inputErrorClass);
        errorContainer.classList.remove(this.config.errorClass);
        errorContainer.textContent = '';
    }

    _checkValidInput(input) {
        if (!input.validity.valid) {
            this._openError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    }

    _checkInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    disableButton = () => {
        if (this._checkInvalidInput()) {
            this._buttonElement.classList.add(this.config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this.config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        };
    }
    
    resetValidation() {
        this._disableButton();
    };

    _setEventListener() {
        this._inputList = Array.from(this._form.querySelectorAll(this.config.inputSelector));
        this._buttonElement = this._form.querySelector(this.config.submitButtonSelector);
        this._disableButton();
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkValidInput(input);
                this._disableButton();
            });
        });
    }

    enableValidation() {
        this._setEventListener();
    }
}
export {FormValidator};