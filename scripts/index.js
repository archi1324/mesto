let popupOpened = document.querySelector('.profile__edit-button');
let popupAdd = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__exit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupField = popup.querySelector('.popup__field');
let popupSubtitle = popup.querySelector('.popup__subtitle');
let submit = popup.querySelector('.form');
let likeButton = document.querySelector('.card__like')
let Addpopup = document.querySelector('.popup__add')

let openPopup = function (popup) {
  popup.classList.add('popup_opened');
}


popupAdd.addEventListener('click', function(){openPopup(Addpopup)});

let popupExit = function (popup) {
  popup.classList.remove('popup_opened');
}

popupOpened.addEventListener('click', function(){
  openPopup(popup)
  popupField.value = profileName.textContent;
  popupSubtitle.value = profileDescription.textContent;
});

let popupSubmit = function (event) {
  event.preventDefault();
  profileName.textContent = popupField.value;
  profileDescription.textContent = popupSubtitle.value;
  console.log(profileName);
  popupExit(popup);
}

submit.addEventListener('submit',popupSubmit);
popupClose.addEventListener('click', function(){popupExit(popup)});

const exitAdd = document.querySelector('.popup__exit_add')
exitAdd.addEventListener('click', function(){                       //закрытие ФОРМЫ 2 ПОПАП по клику
  popupExit(Addpopup);        
});
const exitZoom = document.querySelector('.popup__exit_zoom')
exitZoom.addEventListener('click',function(){
  popupExit(zoomPopup); 
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

function creatCard(card){
  console.log(card);
  const cardNew = cardTemplate.cloneNode(true);
  const cardImage = cardNew.querySelector('.card__image');
  const cardTitle = cardNew.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  console.log(cardImage);
  const cardLike =  cardNew.querySelector('.card__like');
  cardLike.addEventListener('click', clickLike);
  const cardTrash = cardNew.querySelector('.card__trash');
  cardTrash.addEventListener ('click', Delete);
  cardImage.addEventListener ('click', zoomPhoto);
  return cardNew;
};

initialElements.forEach ((card) => {
  const newElement = creatCard(card);
  elementsItem.prepend(newElement);
});

function clickLike(cardLike) { 
  cardLike.target.classList.toggle('card__like_on');
};
 
function Delete(evt)
{ 
  const purge = evt.target.closest('.card').remove();  
}

const TitleInput = document.querySelector('.popup__field_add'); 
const linkInput = document.querySelector('.popup__subtitle_add'); 
const formElementCard = document.querySelector('.form__add'); 

function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    const NameValue = TitleInput.value;
    const LinkValue = linkInput.value;
    const card = {link: LinkValue ,name:NameValue }
    elementsItem.prepend(creatCard(card)); 
    console.log(linkInput.value);
    popupExit(Addpopup);
};

formElementCard.addEventListener('submit', handleFormSubmitAdd);

let openPopupAdd = function () {
  zoomPopup.classList.add('popup_opened');
}

const zoomPopup = document.querySelector('.popup__zoom');
const photoPopup = document.querySelector('.popup__zoom_photo');
const AltPopup = document.querySelector('.popup__zoom_title');
function zoomPhoto(card) {
  openPopupAdd();
   AltPopup.textContent = card.target.alt;
   photoPopup.src =card.target.src;
};
