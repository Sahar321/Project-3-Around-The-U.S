//  imports
import FormValidator from "../src/components/FormValidator.js";
import Card from "../src/components/Card.js";
import {
    initialCards,
    formConfigIndex,
    indexImageUrls
} from "../src/utils/constants.js"
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



// Set index images
initIndexImages()

function initIndexImages() {
    const profileAvater = document.querySelector("#profileAvater");
    const headerLogo = document.querySelector("#headerLogo");
    const favicon = document.querySelector("#favicon");
    const { profileAvaterURL, headerLogoURL, faviconURL } = indexImageUrls
    profileAvater.src = profileAvaterURL;
    headerLogo.src = headerLogoURL;
    favicon.href = faviconURL;
}



//  Profile Section
function handleEditProfileButtonClick() {
    fillProfileForm(userInfo.getUserInfo())
    profileFormValidator.resetValidation()
    popupProfile.open();
}

function fillProfileForm(data) {
    const profileName = document.querySelector(profileFormSelectors.profileNameSelector)
    const profileTitle = document.querySelector(profileFormSelectors.profileTitleSelector)
    const { profileName: userName, profileTitle: userJob } = data
    profileName.value = userName
    profileTitle.value = userJob
}

//  #region Card Section

const cardListSection = new Section({
    items: initialCards,
    renderer: addCard
}, cardListSelector)
cardListSection.render();

function addCard(cardData) {
    const card = new Card(cardData, cardTemplateSelector, (imageData) => {
        popupWithImage.open(imageData)
    })
    cardListSection.addItem(card.createCard())
}

function handleAddCardButtonClick() {
    cardFormValidator.resetValidation()
    popupAddCard.open()
}
//#endregion 

// Event Listeners
profileEditInfoButton.addEventListener("click", handleEditProfileButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick)