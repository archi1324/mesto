import { Card} from "../components/Card.js";
import { FormValidator} from "../components/FormValidator.js";
import { validationConfig,apiConfig} from "../utils/initialElements.js";
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import './index.css';
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import { Api } from '../components/Api.js';

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const cardsContainerSelector = '.elements';
const popupField = document.querySelector('.popup__field');
const popupSubtitle = document.querySelector('.popup__subtitle');
const formEditProfile = document.querySelector('.form');
export const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const formElementCard = document.querySelector('.popup__form-add');
export const zoomPopup = document.querySelector('.popup_zoom');
export const photoPopup = document.querySelector('.popup__photo-zoom');
export const altPopup = document.querySelector('.popup__title-zoom');
const saveButton = document.querySelector('.popup__submit');
const formAvatarElement = document.querySelector('.popup__form-avatar');
const avatarChangeButton = document.querySelector('.profile__avatar-button');

const api = new Api(apiConfig);
let userId;

// validation
const avatarCardValidator = new FormValidator(validationConfig, formAvatarElement);
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const cardValidation = new FormValidator(validationConfig, formElementCard);
cardValidation.enableValidation();
profileValidation.enableValidation();
avatarCardValidator.enableValidation();

// userForm
const userForm = new UserInfo({
  selectorName: '.profile__name',
  selectorAbout: '.profile__description',
  selectorAvatar: '.profile__avatar-icon'});

// section
const section = new Section ({
  renderer: (card) => {
    section.addItem(createCard(card));
  }
}, 
cardsContainerSelector
);

// userInfo
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    const dataUser = res[0];
    const init = res[1];
    userId = dataUser._id;
    userForm.setUserInfo({
      name: dataUser.name,
      about: dataUser.about,
      avatar: dataUser.avatar
    });
      section.renderItems(init);
    })
  .catch((err) => {console.log(err)});


//popupProfile
const profilePopup = new PopupWithForm({
  formSubmit: (evt ,data) => {
    evt.preventDefault();
     api.editUserInfo(data)
  .then((res) => {
    userForm.setUserInfo(res);
    console.log(res);
  })
  .then(() => profilePopup.close())
  .catch((err) => {console.log(err)})
  .finally(() => {
    saveButton.textContent = 'Сохранение...';
  })
},
},'.popup_edit' 
);
profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', ()  =>{
  profilePopup.openPopup();
  const userData = userForm.getUserInfo();
  popupField.value = userData.name;
  popupSubtitle.value = userData.about;
  profileValidation.resetValidation();
});

// popupAdd
const addCardPopup = new PopupWithForm({ 
  formSubmit: (evt ,data) => {
    evt.preventDefault();
    api.addNewCard({
      name: data.name,
      link: data.link,
    })
    .then((data) => {
      section.addItem(createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        owner: {_id: userId}
      })
      );
    })
    .then(() => addCardPopup.closePopup())
    .catch((err) => {console.log(err)})
    .finally(() => saveButton.textContent = 'Cохранение...');
    },
  },'.popup_add'
);

addCardPopup.setEventListeners();

addPopupOpenButton.addEventListener('click', () => {
  cardValidation.resetValidation();
  addCardPopup.openPopup();
})

//Avatar popup
const avatarPopup = new PopupWithForm({
formSubmit: (evt,data) => {
  evt.preventDefault();
api.changeAvatar({avatar: data.link})
.then(() => {
userForm.setAvatarLink(data.link);
  avatarPopup.closePopup();
})
     .catch((err) => console.log(err))
     .finally(() => saveButton.textContent = 'Сохранение...');
  },
  },
'.popup_avatar'
);

 avatarPopup.setEventListeners();
 avatarChangeButton.addEventListener('click', () =>{
  avatarCardValidator.resetValidation();
  avatarPopup.openPopup();
 });

// popupWithimage
const popupZoom = new PopupWithImage('.popup_zoom');
popupZoom.setEventListeners();

// delete popup
const popupDelete = new PopupWithDelete('.popup_card_delete');
popupDelete.setEventListeners();

//Сreate card
function createCard(item) {
  const newCard = new Card({
    card: item,
    userId: userId,
    cardClick: (name, link) => {
      popupZoom.openZoom(name, link);
    },
    cardTrash(card) {
      popupDelete.open(() => {
        api.deleteCard(card.getId())
        .then(() => {
          card.deletesCard();
          popupDelete.close();
        })
        .catch((err) => {console.log(err)})
      });
    },
    cardLike(card)  {
      console.log(card);
      api.likeCard(card.getId())
        .then((data) =>  {card.toggleLike(data)})
        .catch((err) => {console.log(err)})
      },
    deleteCardLike(card) {
      api.deleteCardLike(card.getId())
      .then((data) => {card.toggleLike(data)})
      .catch((err) => {console.log(err)})
    },
  },
'.card__template'
);
const cardTemplate = newCard.generateCard();
return cardTemplate;
}
