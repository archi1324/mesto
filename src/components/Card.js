export class Card {
    constructor({card, userId, cardClick, cardTrash, cardLike, deleteCardLike, cardId},templateSelector) {
      this._card = card;
      this._name = card.name;
      this._link = card.link;
      this._likes = card.likes;
      this.cardClick = cardClick;
      this.cardTrash = cardTrash;
      this.cardLike = cardLike;
      this.deleteCardLike = deleteCardLike;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this._id = card._id;
      this._owner = card.owner._id;
      console.log(this.cardTrash);
    }
    
    //template
    _getTemplate() {
      const cardNew = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
      return cardNew;
    }
    
    //generateCard
    generateCard() {
      this._card = this._getTemplate();
      this._cardImage = this._card.querySelector('.card__image');
      this._cardTitle = this._card.querySelector('.card__title');
      this.cardLikeButton = this._card.querySelector('.card__like');
      this.cardTrashButton = this._card.querySelector('.card__trash');
      this.cardLikeCount = this._card.querySelector('.card__like-counter');
      this.cardLikeCount.textContent = this._likes.length;
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name; 
      this._checkLike();
      this._trashActive();
      this._setEventListeners();
      return this._card;
    }

      //trash__Active
    _trashActive() {
      if (this._owner === this._userId) {
        this.cardTrashButton.classList.remove('card__trash_disabled');
      }
      else{
        this.cardTrashButton.classList.add('card__trash_disabled');
      }
    }

    deletesCard() {
      this._card.remove();
      this._card = null;
    }


    //Likes
    _checkLike() {
      if (this._likes.some((user) => this._userId === user._id)) {
        this.cardLikeButton.classList.add('card__like_on');
      }
      else {
        this.cardLikeButton.classList.remove('card__like_on');
      }
    }
    
    getId() {
      return this._id;
    }

    toggleLike(data) {
      this._likes = data.likes;
      this.cardLikeCount.textContent = this._likes.length;
      this.cardLikeButton.classList.toggle('card__like_on');
    }
    _setEventListeners() {
      this.cardLikeButton.addEventListener('click',() => {
          if (this.cardLikeButton.classList.contains('card__like_on')) {
            this.deleteCardLike(this);
          } else {
            this.cardLike(this);
          }
      });
      this.cardTrashButton.addEventListener('click',() => this.cardTrash(this));
      this._cardImage.addEventListener('click', () => {
      this.cardClick(this._name, this._link)});
    }
  }