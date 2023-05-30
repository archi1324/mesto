export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._exitButton = this._popup.querySelector('.popup__exit');
        
    }

    openPopup() {
       this._popup.classList.add('popup_opened');
       document.addEventListener('keydown', this._closePopupByEsc);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByEsc);
    }

    _closePopupByEsc(esc) {
        if (esc.key === 'Escape') {
            this.closePopup();
        }
    }

    _popupOverlay(event) {
        if (event.target.classList.contains('popup')) {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._exitButton.addEventListener('click', this.closePopup.bind(this));
        this._popup.addEventListener('click', this._popupOverlay.bind(this));
    }
}
