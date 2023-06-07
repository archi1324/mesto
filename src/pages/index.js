import { Card} from "../scripts/card.js";
import { FormValidator} from "../scripts/FormValidator.js";
import { initialElements,validationConfig} from "../utils/initialElements.js";
import {Section} from '../scripts/Section.js';
import {UserInfo} from '../scripts/UserInfo.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import './index.css';

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const cardsContainerSelector = '.elements';
const popupField = document.querySelector('.popup__field');
const popupSubtitle = document.querySelector('.popup__subtitle');
const popupFieldAdd = document.querySelector('.popup__field-add');
const popupSubtitleAdd = document.querySelector('.popup__subtitle-add');
const formEditProfile = document.querySelector('.form');
export const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const formElementCard = document.querySelector('.popup__form-add');
export const zoomPopup = document.querySelector('.popup_zoom');
export const photoPopup = document.querySelector('.popup__photo-zoom');
export const altPopup = document.querySelector('.popup__title-zoom');
const saveButton = document.querySelector('.popup__submit')

// validation
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const cardValidation = new FormValidator(validationConfig, formElementCard);
cardValidation.enableValidation();
profileValidation.enableValidation();

//popupProfile
const profilePopup = new PopupWithForm(
  (evt, input) => {
    evt.preventDefault();
    userInfo.setUserInfo({name: popupField.value, description: popupSubtitle.value});
    console.log(userInfo);
    profilePopup.closePopup();
  },'.popup_edit' 
);
profilePopup.setEventListeners();


profilePopupOpenButton.addEventListener('click', ()  =>{
  profilePopup.openPopup();
  const {profileName: title, profileDescription: description} = userInfo.getUserInfo();
  popupField.value = title;
  popupSubtitle.value = description;
  profileValidation.resetValidation();
});

// popupAdd
const addCardPopup = new PopupWithForm( 
(evt, input) => {
  evt.preventDefault();
  const newCard = createCard({name: popupFieldAdd.value, link: popupSubtitleAdd.value});
  console.log(newCard);
  section.addItem(newCard); 
  addCardPopup.closePopup();
},'.popup_add'
);

addCardPopup.setEventListeners();

addPopupOpenButton.addEventListener('click', () => {
  cardValidation.resetValidation();
  addCardPopup.openPopup();
})

// userinfo
const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorDescription: '.profile__description'});

// section
  const section = new Section ({
    items: initialElements.reverse(), 
    renderer: (card) => {
      const newCard = createCard(card);
      section.addItem(newCard);
    }
  }, 
  cardsContainerSelector
);

section.renderItems();

// popupWithimage
const popupZoom = new PopupWithImage('.popup_zoom');
popupZoom.setEventListeners();

//utils
function createCard(item) {
  const card = new Card({
    card: item,
    cardClick: (name, link) => {
      popupZoom.openZoom(name, link);
    },
},
'.card__template'
);
const cardTemplate = card.generateCard();
return cardTemplate;
}
// function cardClick(name, link) {
//   popupZoom.openPopup(link, name);
//   altPopup.textContent = name;
//   photoPopup.alt = name;
//   photoPopup.src = link;
// }