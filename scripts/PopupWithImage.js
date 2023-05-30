import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomPhoto = this._popup.querySelector('.popup__photo-zoom');
        this._zoomTitle = this._popup.querySelector('.popup__title-zoom');
    }

    openZoom = (item) => {
 
        this._zoomPhoto.src = item.link;
        this._zoomPhoto.alt = item.name;
        this._zoomTitle.textContent = item.name;
        super.openPopup();
    }   
}