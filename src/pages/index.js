import { Card} from "../components/Card.js";
import { FormValidator} from "../components/FormValidator.js";
import { initialElements,validationConfig} from "../utils/initialElements.js";
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import './index.css';

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


// validation
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const cardValidation = new FormValidator(validationConfig, formElementCard);
cardValidation.enableValidation();
profileValidation.enableValidation();

//popupProfile
const profilePopup = new PopupWithForm(
  (data) => {
    evt.preventDefault();
    userInfo.setUserInfo(data);
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
(evt, data) => {
  evt.preventDefault();
  const newCard = createCard(data);
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