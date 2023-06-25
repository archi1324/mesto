import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__submit_delete');
    this._buttonSubmitDefaultTitle = this._deleteButton.textContent;
    this._buttonSubmitAwaitingText = 'Удаление...';
  }
  
  open(evt) {
    super.openPopup();
    this.evt = evt;
    this._deleteButton.onclick = this.evt;
  }

  close() {
    super.closePopup()
  }

  submitStatus(isLoading){
    if(!isLoading){
    this._deleteButton.textContent=this._buttonSubmitDefaultTitle;}
    else{
    this._deleteButton.textContent = this._buttonSubmitAwaitingText;}
  }
}