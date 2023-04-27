const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_edit');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__exit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupField = document.querySelector('.popup__field');
const popupSubtitle = document.querySelector('.popup__subtitle');
const submit = document.querySelector('.form');
const likeButton = document.querySelector('.card__like')
const addPopup = document.querySelector('.popup_add')
const popupFormAadd =document.querySelector('.popup__form-add')
const exitAddButton = document.querySelector('.popup__exit_add');
const elementsItem = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const titleInput = document.querySelector('.popup__field-add');
const linkInput = document.querySelector('.popup__subtitle-add');
const formElementCard = document.querySelector('.popup__form-add');
const zoomPopup = document.querySelector('.popup_zoom');
const photoPopup = document.querySelector('.popup__photo-zoom');
const altPopup = document.querySelector('.popup__title-zoom');
const exitZoomButton = document.querySelector('.popup__exit-zoom');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupEscape);
}

const exitPopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupEscape);
}

const submitPopup = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  exitPopup(profilePopup);
}

const popupOverlay = Array.from(document.querySelectorAll(".popup"));
popupOverlay.forEach(function(popup) {
 popup.addEventListener('click', function(event) {
   if (event.target === event.currentTarget) {
     exitPopup(event.currentTarget);
   }
 })
})

function creatCard(card) {
  const cardNew = cardTemplate.cloneNode(true);
  const cardImage = cardNew.querySelector('.card__image');
  const cardTitle = cardNew.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  const cardLike = cardNew.querySelector('.card__like');
  cardLike.addEventListener('click', clickLike);
  const cardTrash = cardNew.querySelector('.card__trash');
  cardTrash.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', zoomPhoto);
  return cardNew;
};

initialElements.forEach((card) => {
  const newElement = creatCard(card);
  elementsItem.prepend(newElement);
});

function clickLike(cardLike) {
  cardLike.target.classList.toggle('card__like_on');
};

function deleteCard(evt) {
  const purge = evt.target.closest('.card').remove();
}

function submitAdd(evt) {
  evt.preventDefault();
  const nameValue = titleInput.value;
  const linkValue = linkInput.value;
  const card = { link: linkValue, name: nameValue }
  elementsItem.prepend(creatCard(card));
  exitPopup(addPopup);
  evt.target.reset();
};
function zoomPhoto(card) {
  openPopup(zoomPopup);
  altPopup.textContent = card.target.alt;
  photoPopup.alt = card.target.alt;
  photoPopup.src = card.target.src;
};

function popupEscape(event) {
  if (event.key === "Escape") {
    exitPopup(document.querySelector(".popup_opened"));
  }
}

exitAddButton.addEventListener('click', function () {
  exitPopup(addPopup);
});

exitZoomButton.addEventListener('click', function () {
  exitPopup(zoomPopup);
}) 

addPopupOpenButton.addEventListener('click', function () {
   const inputAdd = Array.from(popupFormAadd.querySelectorAll('.popup__input'));
   const buttonAdd = popupFormAadd.querySelector('.popup__submit');
   openPopup(addPopup); 
   disableButton(inputAdd,buttonAdd);
  });

profilePopupOpenButton.addEventListener('click', function () {
  openPopup(profilePopup);
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
});

formElementCard.addEventListener('submit', submitAdd);
submit.addEventListener('submit', submitPopup);
closePopup.addEventListener('click', function () { exitPopup(profilePopup) });

