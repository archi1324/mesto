import { Card} from "../scripts/card.js";
import { FormValidator} from "../scripts/FormValidator.js";
import { initialElements,validationConfig} from "../utils/initialElements.js";
import {Section} from '../scripts/Section.js';
import {UserInfo} from '../scripts/UserInfo.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import './index.css';

const cardsContainerSelector = '.elements';
const popupField = document.querySelector('.popup__field');
const popupSubtitle = document.querySelector('.popup__subtitle');
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
popupZoom.setEventListener();

//popupProfile
const profilePopup = new PopupWithForm('popup_edit', 
  (evt, input) => {
    evt.preventDefault();
    userInfo.setUserInfo({name: input.name, description: input.description});
    profilePopup.closePopup();
  }
);
profilePopup.setEventListener();

saveButton.addEventListener('click', ()  =>{
  const {profileName: title, profileDescription: description} = profile.getUserInfo();
  popupField.value = title;
  popupSubtitle.value = description;
  profileValidation.disableButton();
  profilePopup.openPopup();
});

// popupAdd
const addCardPopup = new PopupWithForm('popup_add', 
(evt, input) => {
  evt.preventDefault();
  const newCard = createCard({name: input.name, link: input.description});
  section.addItem(newCard); 
  addCardPopup.closePopup();
}
);

addCardPopup.setEventListener();

saveButton.addEventListener('click', () => {
  cardValidation.disableButton();
  addCardPopup.openPopup();
})

//utils
function createCard(card) {
  return (new Card(
    {name: card.name, link: card.link}, 
    '.card__template', 
    openPicture
  )).generateCard();
}

function openPicture(title, image) {
  popupZoom.openPopup(image, title);
}
