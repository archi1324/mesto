import {openPopup ,zoomPopup,photoPopup,altPopup} from './index.js';

export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardNew = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
      return cardNew;
    }
  
    generateCard() {
      this._card = this._getTemplate();
      this._cardImage = this._card.querySelector('.card__image');
      this._cardTitle = this._card.querySelector('.card__title');
      this._cardLike = this._card.querySelector('.card__like');
      this._cardTrash = this._card.querySelector('.card__trash');
      this._setEventListeners();
      console.log(this._link);
      console.log(this._name);
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      return this._card;
    }
  
    _likeCard() {
      this._cardLike.classList.toggle('card__like_on');
    }
  
    _deleteCard() {
      this._card.closest('.card').remove();
    }

    _zoomPhoto() {
        openPopup(zoomPopup);
        altPopup.textContent = this._name;
        photoPopup.alt = this._name;
        photoPopup.src = this._link;
      };

    _setEventListeners() {
      this._cardLike.addEventListener('click',() => this._likeCard());
      this._cardTrash.addEventListener('click',() => this._deleteCard());
      this._cardImage.addEventListener('click', () => this._zoomPhoto());
    }
  }