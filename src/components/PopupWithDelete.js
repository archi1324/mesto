import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__submit_delete');
  }
  
  open(evt) {
    super.openPopup();
    this.evt = evt;
    this._deleteButton.onclick = this.evt;
  }

  close() {
    super.closePopup()
  }
}