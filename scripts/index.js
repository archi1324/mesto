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
const addFormPopup = document.querySelector('.popup_add')

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const exitPopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', popupEscape);
}



const exitAddButton = document.querySelector('.popup__exit_add'); 

exitAddButton.addEventListener('click', function () {
  exitPopup(addFormPopup);
});
const exitZoomButton = document.querySelector('.popup__exit-zoom');

exitZoomButton.addEventListener('click', function () {
  exitPopup(zoomPopup);
}) 


addPopupOpenButton.addEventListener('click', function () { openPopup(addFormPopup) });
closePopup.addEventListener('click', function () { exitPopup(profilePopup) });


profilePopupOpenButton.addEventListener('click', function () {
  openPopup(profilePopup);
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
});

const submitPopup = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  exitPopup(profilePopup);
}

submit.addEventListener('submit', submitPopup);



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
  exitPopup(addFormPopup);
  evt.target.reset();
};

formElementCard.addEventListener('submit', submitAdd);


const zoomPopup = document.querySelector('.popup_zoom');
const photoPopup = document.querySelector('.popup__photo-zoom');
const altPopup = document.querySelector('.popup__title-zoom');
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


const popupAll = Array.from(document.querySelectorAll(".popup"));
popupAll.forEach(function(popup) {
 popup.addEventListener('click', function(event) {
   if (event.target === event.currentTarget) {
     exitPopup(event.currentTarget);
   }
 })
})