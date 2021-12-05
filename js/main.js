/// imports
import { enableValidation } from './validate.js';
import { initialCards } from './initialData.js';

/// Variables
const overlayList = document.querySelectorAll(".overlay")
const overlayListButtonClose = document.querySelectorAll(".overlay__btn-close")

const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')
const profileAddCard = document.querySelector('.profile__add')

const formProfile = document.querySelector('#formProfile')
const formProfileName = document.querySelector("[name='profileName']")
const formProfileTitle = document.querySelector("[name='profileTitle']")

const formCard = document.querySelector('#formCard')
const formCardUrl = document.querySelector("[name='CardURL']")
const formCardTitle = document.querySelector("[name='CardTitle']")
const formConfig = {

    formSelector: ".popup",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-submit",
    inactiveButtonClass: "popup__btn-submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"



};

const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards")

const keys = { Escape: 27 }


init();

function init() {

    initialCards.forEach(renderCard);

    overlayList.forEach(elm => elm.addEventListener("click", overlayClickHandler))
    overlayListButtonClose.forEach(elm => elm.addEventListener("click", closePopup))

    // validation
    enableValidation(formConfig);

}

function openPopup(popup) {
    popup.classList.add("overlay_visible")
    document.addEventListener("keyup", handleKeyUp);
}

function closePopup() {
    const overlayVisible = document.querySelector(".overlay_visible")
    if (overlayVisible !== null) {
        overlayVisible.classList.remove("overlay_visible")
        document.removeEventListener("keyup", handleKeyUp);
    }

}




//////////Handlers///////////////
// document
function handleKeyUp(evt) {

    const overlayVisible = document.querySelector(".overlay_visible")

    switch (evt.keyCode) {
        case keys.Escape:
            closePopup()
            break;
    }

}



// Overlay
function overlayClickHandler(evt) {
    const elm = evt.target
        //Make sure the parent("overlay") element is clicked
    if (elm.classList.contains("overlay_visible")) {
        closePopup()
    }
}


//Profile
function profileEditHandler() {
    formProfileName.value = profileName.textContent
    formProfileTitle.value = profileTitle.textContent
    openPopup(formProfile);
}


function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value
    profileTitle.textContent = formProfileTitle.value
    closePopup()
}

// Card
function renderCard(cardData) {
    const createdCard = createCard(cardData)
    cardsList.prepend(createdCard);
}

function createCard(cardData) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardName = card.querySelector(".card__name")
    const cardImg = card.querySelector(".card__img")
    const cardLike = card.querySelector(".card__like")
    const cardDelete = card.querySelector(".card__delete-card")
    cardName.textContent = cardData.name
    cardImg.setAttribute("src", cardData.link)
    cardImg.setAttribute("alt", cardData.name)
    cardLike.addEventListener("click", handleLikeCard)
    cardDelete.addEventListener("click", handleDeleteCard)
    cardImg.addEventListener("click", openCardPreview)
    return card
}



function handleLikeCard(evt) {
    evt.target.classList.toggle("btn-like_state_active")
}

function handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
}

function openAddForm() {
    document.forms["formCard"].reset();

    openPopup(formCard);

}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardData = { name: formCardTitle.value, link: formCardUrl.value };
    renderCard(cardData)
    closePopup()
}

function openCardPreview(evt) {
    const overlayImgContiner = document.querySelector("#overlayImage")
    const overlayPic = document.querySelector(".overlay__img")
    const overlayPicTitle = document.querySelector(".overlay__text")
    const link = evt.target.getAttribute("src")
    const name = evt.target.getAttribute("alt")

    overlayPic.setAttribute("src", link)
    overlayPic.setAttribute("alt", name)
    overlayPicTitle.textContent = name
    openPopup(overlayImgContiner)


}



/// Event Listeners
profileEdit.addEventListener("click", profileEditHandler);
profileAddCard.addEventListener("click", openAddForm)


formProfile.addEventListener("submit", formProfileSubmitHandler);

formCard.addEventListener("submit", handleAddFormSubmit);

//document.addEventListener("keyup", handleKeyUp);