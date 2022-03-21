//  imports
import FormValidator from "../src/components/FormValidator.js";
import Card from "../src/components/Card.js";
import { initialCards, formConfigIndex } from "../src/utils/constants.js"
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js"
import Section from "../src/components/Section.js"
import './index.css'

//  Selectors
const profileInfoSelectors = {
    profileNameSelector: ".profile__name",
    profileTitleSelector: ".profile__title"
}
const profileFormSelectors = {
    profileNameSelector: "#profileName",
    profileTitleSelector: "#profileTitle"
}

const overlayImageSelector = "#overlayImage";
const cardListSelector = ".cards"
const cardTemplateSelector = "#card";
const cardFormSelector = '#formCard'
const profileFormSelector = '#formProfile'

// Profile variables
const profileForm = document.querySelector(profileFormSelector)
const profileAddCardButton = document.querySelector('.profile__add')
const profileEditInfoButton = document.querySelector('.profile__edit-info')
const userInfo = new UserInfo(profileInfoSelectors)

//  Card
const cardForm = document.querySelector(cardFormSelector)

//  Popups 
const popupWithImage = new PopupWithImage(overlayImageSelector)
const popupAddCard = new PopupWithForm(cardFormSelector, cardData => addCard(cardData))
const popupProfile = new PopupWithForm(profileFormSelector, data => userInfo.setUserInfo(data))

// Forms Validations
const cardFormValidator = new FormValidator(formConfigIndex, cardForm)
const profileFormValidator = new FormValidator(formConfigIndex, profileForm)
profileFormValidator.enableValidation()
cardFormValidator.enableValidation()


//  Profile Section
function handleEditProfileButtonClick() {
    const profileName = document.querySelector(profileFormSelectors.profileNameSelector)
    const profileTitle = document.querySelector(profileFormSelectors.profileTitleSelector)
    profileName.value = userInfo.getUserInfo().profileName
    profileTitle.value = userInfo.getUserInfo().profileTitle
    profileFormValidator.resetValidation()
    popupProfile.setEventListeners()
    popupProfile.open();
}

//  #region Card Section

const cardListSection = new Section({
    items: initialCards,
    renderer: cardData => addCard(cardData)
}, cardListSelector)
cardListSection.render();

function addCard(cardData) {
    const card = new Card(cardData, cardTemplateSelector, (imageData) => {
        popupWithImage.setEventListeners();
        popupWithImage.open(imageData)
    })
    cardListSection.addItem(card.createCard())
}

function handleAddCardButtonClick() {
    cardFormValidator.resetValidation()
    popupAddCard.setEventListeners()
    popupAddCard.open()
}
//#endregion 

// Event Listeners
profileEditInfoButton.addEventListener("click", handleEditProfileButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick)