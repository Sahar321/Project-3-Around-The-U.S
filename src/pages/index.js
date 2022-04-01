//  imports
import FormValidator from "../src/components/FormValidator.js";
import Card from "../src/components/Card.js";
import { formConfigIndex, indexImageUrls, indexSelectors } from "../src/utils/constants.js"
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithMessage from "../src/components/popupWithMessage.js";
import UserInfo from "../src/components/UserInfo.js"
import Section from "../src/components/Section.js"
import { api } from "../src/components/Api.js"
import './index.css'

const selectors = indexSelectors
    // Profile variables
const profileForm = document.querySelector(selectors.profileForm.form)
const profileAvatarForm = document.querySelector(selectors.profileAvatarForm)
const profileName = document.querySelector(selectors.profileForm.profileName)
const profileTitle = document.querySelector(selectors.profileForm.profileTitle)

const userInfo = new UserInfo(selectors.profileInfo)

//  Card variables
const cardForm = document.querySelector(selectors.cardForm)
let cardsLoading = document.querySelector("#cardsLoading");
let cardListSection;

//  Popups
const popupWithMessage = new PopupWithMessage(selectors.popupWithMessage)
const popupDeleteCard = new PopupWithForm(selectors.popupConfirmAction)
const popupWithImage = new PopupWithImage(selectors.overlayImage)


const popupAddCard = new PopupWithForm(selectors.cardForm, data => {
    api.createNewCard(data)
        .then((res) => {
            addCard(res)
        })
        .catch((error) => {
            if (error == "") error = "Failed to get response from server"
            popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
        })
        .finally(() => {
            popupAddCard.close()
        })
})





const popupProfile = new PopupWithForm(selectors.profileForm.form, data => {
    api.setProfileInfo(data)
        .then(() => {
            userInfo.setUserInfo(data)
            popupProfile.close()
        })

    .catch((error) => {
            if (error == "") error = "Failed to update"
            popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
        })
        .finally(() => {
            popupProfile.close()
        })
})

const popupAvatarEdit = new PopupWithForm(selectors.profileAvatarForm, link => {
    api.setAvatar(link)
        .then(() => {
            userInfo.setUserAvatar(link.avatar)
            popupAvatarEdit.close()
        })
        .catch((error) => {
            if (error == "") error = "Failed to update"
            popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
        })
        .finally(() => {
            popupAvatarEdit.close()
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
function getInitialData() {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(
            ([user, cardItems]) => {
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
                    items: cardItems,
                    renderer: addCard
                }, selectors.cardList)

                cardListSection.render()
            })
        .catch((error) => {
            if (error == "") error = "Failed to get card & user info"
            popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
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

function initializePage() {
    getInitialData()
    initIndexImages()
}
initializePage()

//#endregion


//  Profile Section
function fillProfileForm(data) {
    console.log(selectors)

    const { profileName: userName, profileTitle: userJob } = data
    profileName.value = userName
    profileTitle.value = userJob
}

function handleEditProfileButtonClick() {
    fillProfileForm(userInfo.getUserInfo())
    profileFormValidator.resetValidation()
    popupProfile.open();
}
//  #region Card Section


function createCard(cardData) {
    const card = new Card(cardData,
        selectors.cardTemplate,
        handleCardClick,
        handleCardDelete,
        handleCardLike,
        userInfo.userId)
    return card.createCard(userInfo.userId)

}

function addCard(cardElement) {
    cardListSection.addItem(createCard(cardElement))
}


function handleCardClick(imageData) {
    popupWithImage.open(imageData)
}

function handleCardDelete(card) {
    popupDeleteCard.open()
    popupDeleteCard.setAction(() => {
        api.deleteCard(card.cardId)
            .then(() => {
                card.removeCard()
                popupDeleteCard.close()
            })
            .catch((error) => {
                if (error == "") error = "Failed to delete card"
                popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
            })
            .finally(() => {
                popupDeleteCard.close()
            })

    })
}


function handleCardLike(card) {
    if (card.isLiked()) {
        api.removeLike(card.cardId)
            .then(res => card.toggleLike(res.likes))
            .catch((error) => {
                if (error == "") error = "Failed to removeLike"
                popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
            })
    } else {
        api.addLike(card.cardId)
            .then((res) => card.toggleLike(res.likes))
            .catch((error) => {
                if (error == "") error = "Failed to add a like"
                popupWithMessage.open({ title: "Error occurs", subtext: error }, "Error")
            })
    }
}

//#endregion

// Event Listeners


document.querySelector('.profile__edit-info')
    .addEventListener("click", handleEditProfileButtonClick);

document.querySelector('.profile__add')
    .addEventListener("click", () => {
        cardFormValidator.resetValidation()
        popupAddCard.open()
    })

document.querySelector("#profileAvatarEdit")
    .addEventListener("click", () => {
        profileAvatarFormValidator.resetValidation()
        popupAvatarEdit.open()

    })