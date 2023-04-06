let popupOpened = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__exit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupField = popup.querySelector('.popup__field');
let popupSubtitle = popup.querySelector('.popup__subtitle');
let submit = popup.querySelector('.popup__submit');

let openPopup = function () {
  popup.classList.add('popup_opened');
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
}

let popupExit = function () {
  popup.classList.remove('popup_opened');
}

let popupSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  popupExit();
}


popupOpened.addEventListener('click', openPopup);
submit.addEventListener('submit', popupSubmit);
popupClose.addEventListener('click', popupExit);
