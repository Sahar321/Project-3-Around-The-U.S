//  imports
import FormValidator from "../src/components/FormValidator.js";
import Card from "../src/components/Card.js";
import { formConfigIndex, indexImageUrls } from "../src/utils/constants.js"
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import UserInfo from "../src/components/UserInfo.js"
import Section from "../src/components/Section.js"
import { api } from "../src/components/Api.js"
import './index.css'



//  Selectors
const profileInfoSelectors = {
    profileNameSelector: ".profile__name",
    profileTitleSelector: ".profile__title",
    profileAvatarSelector: ".profile__avatar"
}
const profileFormSelectors = {
    profileNameSelector: "#profileName",
    profileTitleSelector: "#profileTitle",
    profileAvatarImageSelector: "#avatarImage"
}

const overlayImageSelector = "#overlayImage";
const cardListSelector = ".cards"
const cardTemplateSelector = "#card";
const cardFormSelector = '#formCard'
const profileFormSelector = '#formProfile'
const profileAvatarFormSelector = '#formProfileAvatar'
const popupConfirmActionSelector = "#popupConfirmAction"

// Profile variables
const profileForm = document.querySelector(profileFormSelector)
const profileAvatarForm = document.querySelector(profileAvatarFormSelector)
const profileAddCardButton = document.querySelector('.profile__add')
const profileEditInfoButton = document.querySelector('.profile__edit-info')
const userInfo = new UserInfo(profileInfoSelectors)

//  Card variables
const cardForm = document.querySelector(cardFormSelector)
let cardsLoading = document.querySelector("#cardsLoading");
let cardListSection;

//  Popups 
const popupWithImage = new PopupWithImage(overlayImageSelector)

const popupAddCard = new PopupWithForm(cardFormSelector, data => {
    api.createNewCard(data).then(addCard)
})

const popupProfile = new PopupWithForm(profileFormSelector, data => {
    api.setProfileInfo(data).then(userInfo.setUserInfo(data))
})

const popupAvatarEdit = new PopupWithForm(profileAvatarFormSelector, link => {

    api.setAvatar(link).then(() => {
        userInfo.setUserAvatar(link.avatar)
    })
})


// Forms Validations
const cardFormValidator = new FormValidator(formConfigIndex, cardForm)
const profileFormValidator = new FormValidator(formConfigIndex, profileForm)
const profileAvatarFormValidator = new FormValidator(formConfigIndex, profileAvatarForm)
profileFormValidator.enableValidation()
cardFormValidator.enableValidation()
profileAvatarFormValidator.enableValidation()

//#region initializePage
initializePage()

function initializePage() {
    getInitialData()
    initIndexImages()
}

function getInitialData() {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
        ([user, cards]) => {
            userInfo.userId = user._id
            const userObj = {
                profileName: user.name,
                profileTitle: user.about,
                avatar: user.avatar
            }

            userInfo.setUserInfo(userObj)
            userInfo.setUserAvatar(userObj.avatar)

            cardsLoading.remove()
            cardsLoading = null

            cardListSection = new Section({
                items: cards,
                renderer: addCard
            }, cardListSelector)

            cardListSection.render()
        })
}

// Set index images
function initIndexImages() {
    const profileAvatar = document.querySelector("#profileAvatar");

    const headerLogo = document.querySelector("#headerLogo");
    const favicon = document.querySelector("#favicon");
    const { loadingBlueUrl, headerLogoURL, faviconURL } = indexImageUrls
    profileAvatar.src = loadingBlueUrl;
    headerLogo.src = headerLogoURL;
    cardsLoading.src = loadingBlueUrl
    favicon.href = faviconURL;
}
//#endregion


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
function addCard(cardData) {
    const card = new Card(cardData, cardTemplateSelector,
        (imageData) => { // handle  popup image
            popupWithImage.open(imageData)
        },
        (cardID) => { // handle delete 
            const popupDeleteCard = new PopupWithForm(popupConfirmActionSelector, () => {
                api.deleteCard(cardID).then(card.removeCard())
            })
            popupDeleteCard.open()
        },
        (cardID) => { // handle like
            if (card.isLiked()) {
                api.removeLike(cardID).then(res => card.toggleLike(res.likes))
            } else {
                api.addLike(cardID).then((res) => card.toggleLike(res.likes))
            }
        }, userInfo.userId)

    cardListSection.addItem(card.createCard(userInfo.userId))
}

function handleAddCardButtonClick() {
    cardFormValidator.resetValidation()
    popupAddCard.open()
}
//#endregion 

// Event Listeners
profileEditInfoButton.addEventListener("click", handleEditProfileButtonClick);
profileAddCardButton.addEventListener("click", handleAddCardButtonClick)

document.querySelector("#profileAvatarEdit").addEventListener("click", () => popupAvatarEdit.open())