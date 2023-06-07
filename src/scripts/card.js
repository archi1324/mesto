export class Card {
    constructor({card, cardClick},templateSelector) {
      this._templateSelector = templateSelector;
      this._name = card.name;
      this._link = card.link;
      this.cardClick = cardClick;
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
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;  
      return this._card;
    }
  
    _likeCard() {
      this._cardLike.classList.toggle('card__like_on');
    }
  
    _deleteCard() {
      this._card.remove();
      this._card = null;
    }



    _setEventListeners() {
      this._cardLike.addEventListener('click',() => this._likeCard());
      this._cardTrash.addEventListener('click',() => this._deleteCard());
      this._cardImage.addEventListener('click', () => {
        console.log(this);
      this.cardClick(this._name, this._link)});
    }
  }