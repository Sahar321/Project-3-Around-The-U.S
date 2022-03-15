/// imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { initialCards, headerLogo, profileAvater } from "./initialData.js"
import { formConfigIndex } from "./ConfigData.js"
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js"
import Section from "./Section.js"
import '../pages/index.css'



/// -Selectors
const overlayImageSelector = "#overlayImage";
const cardListSelector = ".cards"
const cardTemplateSelector = "#card";
const cardFormSelector = '#formCard'
const profileFormSelector = '#formProfile'

/// Variables
const profileEdit = document.querySelector('.profile__edit-info')
const profileForm = document.querySelector(profileFormSelector)
const profileFormValidator = new FormValidator(formConfigIndex, profileForm)
const profileAddCard = document.querySelector('.profile__add')
const userInfoProfile = new UserInfo({
    profileName: ".profile__name",
    profileTitle: ".profile__title"
})

//card
const cardForm = document.querySelector(cardFormSelector)
const cardFormValidator = new FormValidator(formConfigIndex, cardForm)


profileFormValidator.enableValidation()
cardFormValidator.enableValidation()





//Profile
function profileFormEditHandler() {
    const popupProfile = new PopupWithForm(profileFormSelector, data => userInfoProfile.setUserInfo(data))
    const userInfoFormEditor = new UserInfo({ profileName: "#profileName", profileTitle: "#profileTitle" })
    userInfoFormEditor.setUserInfo(userInfoProfile.getUserInfo())
    profileFormValidator.resetValidation()
    popupProfile.setEventListeners()
    popupProfile.open();

}




// Card


const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData, cardTemplateSelector, (imageData) => {
            const pop = new PopupWithImage(overlayImageSelector)
            pop.setEventListeners();
            pop.open(imageData)
        })
        cardSection.addItem(card.createCard());

    }

}, cardListSelector)
cardSection.render();


function cardFormAddHandler() {
    const popupAddCard = new PopupWithForm(cardFormSelector, (cardData) => {
        const card = new Card(cardData, cardTemplateSelector, (imageData) => {
            const pop = new PopupWithImage(overlayImageSelector)
            pop.setEventListeners();
            pop.open(imageData)
        })
        cardSection.addItem(card.createCard())
    })
    cardFormValidator.resetValidation()
    popupAddCard.setEventListeners()
    popupAddCard.open()
}

/// Event Listeners
profileEdit.addEventListener("click", profileFormEditHandler);
profileAddCard.addEventListener("click", cardFormAddHandler)