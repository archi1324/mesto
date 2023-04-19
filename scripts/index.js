const popupOpened = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('.popup_profile');
const closePopup = popup.querySelector('.popup__exit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupField = popup.querySelector('.popup__field');
const popupSubtitle = popup.querySelector('.popup__subtitle');
const submit = popup.querySelector('.form');
const likeButton = document.querySelector('.card__like')
const addFormPopup = document.querySelector('.popup_add')

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}


popupAdd.addEventListener('click', function () { openPopup(addFormPopup) });

const Exitpopup = function (popup) {
  popup.classList.remove('popup_opened');
}

popupOpened.addEventListener('click', function () {
  openPopup(popup)
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
});

const Submitpopup = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  Exitpopup(popup);
}

submit.addEventListener('submit', Submitpopup);
closePopup.addEventListener('click', function () { Exitpopup(popup) });




const exitAdd = document.querySelector('.popup__exit_add')
exitAdd.addEventListener('click', function () {
  Exitpopup(addFormPopup);
});
const exitZoom = document.querySelector('.popup__exit-zoom')
exitZoom.addEventListener('click', function () {
  Exitpopup(zoomPopup);
})

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


const elementsItem = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');

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

const titleInput = document.querySelector('.popup__field-add');
const linkInput = document.querySelector('.popup__subtitle-add');
const formElementCard = document.querySelector('.popup__form-add');

function submitAdd(evt) {
  evt.preventDefault();
  const nameValue = titleInput.value;
  const linkValue = linkInput.value;
  const card = { link: linkValue, name: nameValue }
  elementsItem.prepend(creatCard(card));
  Exitpopup(addFormPopup);
  evt.target.reset();
};

formElementCard.addEventListener('submit', submitAdd);

const openPopupAdd = function () {
  zoomPopup.classList.add('popup_opened');
}

const zoomPopup = document.querySelector('.popup_zoom');
const photoPopup = document.querySelector('.popup__photo-zoom');
const altPopup = document.querySelector('.popup__title-zoom');
function zoomPhoto(card) {
  openPopupAdd();
  altPopup.textContent = card.target.alt;
  photoPopup.alt = card.target.alt;
  photoPopup.src = card.target.src;
};
