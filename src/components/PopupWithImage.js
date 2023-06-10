import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomPhoto = this._popup.querySelector('.popup__photo-zoom');
        this._zoomTitle = this._popup.querySelector('.popup__title-zoom');
    }

    openZoom = (name ,link) => {
        this._zoomPhoto.src = link;
        this._zoomPhoto.alt = name;
        this._zoomTitle.textContent = name;
        super.openPopup();
    }   
}