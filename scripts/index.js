import { Card } from "./card.js";
import { FormValidator} from "./FormValidator.js";
import { initialElements,validationConfig} from "./initialElements.js";

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_edit');
const buttonCloseFormEditProfile = document.querySelector('.popup__exit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupField = document.querySelector('.popup__field');
const popupSubtitle = document.querySelector('.popup__subtitle');
const formEditProfile = document.querySelector('.form');
const addPopup = document.querySelector('.popup_add')
const exitAddButton = document.querySelector('.popup__exit_add');
const elementsItem = document.querySelector('.elements');
export const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const titleInput = document.querySelector('.popup__field-add');
const linkInput = document.querySelector('.popup__subtitle-add');
const formElementCard = document.querySelector('.popup__form-add');
export const zoomPopup = document.querySelector('.popup_zoom');
export const photoPopup = document.querySelector('.popup__photo-zoom');
export const altPopup = document.querySelector('.popup__title-zoom');
const exitZoomButton = document.querySelector('.popup__exit-zoom');
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const cardValidation = new FormValidator(validationConfig, formElementCard);
cardValidation.enableValidation();
profileValidation.enableValidation();

export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const exitPopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//попап профиля
profilePopupOpenButton.addEventListener('click', function () {
  openPopup(profilePopup);
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
});

const submitEditProfileForm = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  exitPopup(profilePopup);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
buttonCloseFormEditProfile.addEventListener('click', function () { exitPopup(profilePopup) });

// попап карточки
function submitAddCardForm(evt) {
  evt.preventDefault();
  const newObject = {
  name: titleInput.value,
  link: linkInput.value
};
  elementsItem.prepend(createCard(newObject));
  exitPopup(addPopup);
  evt.target.reset();
};

formElementCard.addEventListener('submit', submitAddCardForm);

addPopupOpenButton.addEventListener('click', function () {
  openPopup(addPopup);
  cardValidation.resetValidation();
});

exitAddButton.addEventListener('click', function () {
  exitPopup(addPopup);
});

// создание карточки
function createCard(data) {
  const card = new Card(data, '#card-template', zoomPhoto);
  return card.generateCard();
};

initialElements.forEach(function (card) {
  const newCard = createCard(card);
  elementsItem.prepend(newCard);
});

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    exitPopup(document.querySelector(".popup_opened"));
  }
}

const popupOverlay = Array.from(document.querySelectorAll(".popup"));
popupOverlay.forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      exitPopup(event.currentTarget);
    }
  })
})

// приблежение карточки
function zoomPhoto(card) {
  openPopup(zoomPopup);
  altPopup.textContent = card.target.alt;
  photoPopup.alt = card.target.alt;
  photoPopup.src = card.target.src;
};

exitZoomButton.addEventListener('click', function () {
  exitPopup(zoomPopup);
})