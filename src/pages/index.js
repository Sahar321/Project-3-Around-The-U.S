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
import PopupWithSubmit from "../src/components/PopupWithSubmit.js";



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

const userInfo = new UserInfo(profileInfoSelectors)

//  Card variables
const cardForm = document.querySelector(cardFormSelector)
let cardsLoading = document.querySelector("#cardsLoading");
let cardListSection;

//  Popups
const popupDeleteCard = new PopupWithSubmit(popupConfirmActionSelector)
const popupWithImage = new PopupWithImage(overlayImageSelector)

const popupAddCard = new PopupWithForm(cardFormSelector, data => {
    api.createNewCard(data).then((res) => {
        addCard(res)
        popupAddCard.close()
    })
})

const popupProfile = new PopupWithForm(profileFormSelector, data => {
    api.setProfileInfo(data).then(() => {
        userInfo.setUserInfo(data)
        popupProfile.close()
    })
})

const popupAvatarEdit = new PopupWithForm(profileAvatarFormSelector, link => {
    api.setAvatar(link).then(() => {
        userInfo.setUserAvatar(link.avatar)
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

    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
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

function initializePage() {
    getInitialData()
    initIndexImages()
}
initializePage()

//#endregion


//  Profile Section
function fillProfileForm(data) {
    const profileName = document.querySelector(profileFormSelectors.profileNameSelector)
    const profileTitle = document.querySelector(profileFormSelectors.profileTitleSelector)
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


/* function testing__AddCard(cardsCount) {
    for (let i = 0; i < cardsCount; i++) {
        const imagesLinks = {
            0: "https://images.pexels.com/photos/2917871/pexels-photo-2917871.jpeg",
            1: "https://images.pexels.com/photos/2917871/pexels-photo-2917871.jpeg",
            2: "https://images.pexels.com/photos/6135388/pexels-photo-6135388.jpeg",
            3: "https://images.pexels.com/photos/6135388/pexels-photo-6135388.jpeg",
            4: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg",
            5: "https://images.pexels.com/photos/248867/pexels-photo-248867.jpeg",
            6: "https://images.pexels.com/photos/1437126/pexels-photo-1437126.jpeg",
            7: "https://images.pexels.com/photos/720235/pexels-photo-720235.jpeg",
            8: "https://images.pexels.com/photos/4976339/pexels-photo-4976339.jpeg",
            9: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
            10: "https://images.pexels.com/photos/409696/pexels-photo-409696.jpeg",
            11: "https://hdfreewallpaper.net/wp-content/uploads/2015/09/flowers-rose-garden-wallpaper-free-hd-for-desktop-1024x640.jpg"
        }
        let id = Math.floor(Math.random() * 9);
        const cardData = {
            name: `test ${i} `,
            link: imagesLinks[`${id}`]
        }
        popupAddCard._submitHandler(cardData)
    }
}
 */


function addCard(data) {
    const card = new Card(data,
        cardTemplateSelector,
        handleCardClick,
        handleCardDelete,
        handleCardLike,
        userInfo.userId)

    cardListSection.addItem(card.createCard(userInfo.userId))
}

function handleCardClick(imageData) {
    popupWithImage.open(imageData)
}

function handleCardDelete(card) {
    popupDeleteCard.open()
    popupDeleteCard.setAction(() => {
        api.deleteCard(card.cardId).then(() => {
            card.removeCard()
            popupDeleteCard.close()
        })
    })
}


function handleCardLike(card) {
    if (card.isLiked()) {
        api.removeLike(card.cardId).then(res => card.toggleLike(res.likes))
    } else {
        api.addLike(card.cardId).then((res) => card.toggleLike(res.likes))
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