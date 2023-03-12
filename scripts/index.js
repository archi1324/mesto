const popups = document.querySelectorAll('.popup')

const profilePopup = document.querySelector('.profile-popup')
const editForm = document.forms['edit-form']

const profileName = document.querySelector('.profile__name')
const profileStatus = document.querySelector('.profile__description')

const editBtn = document.querySelector('.profile__edit-button')

const exitBtns = document.querySelectorAll('.popup__exit')
const nameField = document.getElementById('title')
const statusField = document.getElementById('description')

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

const showProfilePopup = (p) => {
  p.target.blur()
  nameField.value = profileName.textContent
  statusField.value = profileStatus.textContent
  openPopup(profilePopup)
}


const closePopupByClickingOnOverlay = (p) => {
  if (p.target !== p.currentTarget) return
  closePopup()
}
const closePopup = () => {
    document.querySelector('.popup_opened').classList.remove('popup_opened')
  }


const handleProfileFormSubmit = (p) => {
  p.preventDefault()
  profileName.textContent = nameField.value
  profileStatus.textContent = statusField.value
  closePopup()
}


editBtn.addEventListener('click', showProfilePopup)
editForm.addEventListener('submit', handleProfileFormSubmit)
