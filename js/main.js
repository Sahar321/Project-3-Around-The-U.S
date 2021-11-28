/// Variables
import enableValidation from './sam.js';

const overlayClose = document.querySelectorAll(".overlay__btn-close")

const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')
const profileAddCard = document.querySelector('.profile__add')

const frmProfile = document.querySelector('#frmProfile')
const frmProfileName = document.querySelector("[name='profileName']")
const frmProfileTitle = document.querySelector("[name='profileTitle']")
const frmProfileClose = document.querySelector('#frmProfile *.btn-close')

const frmCard = document.querySelector('#frmCard')
const frmCardUrl = document.querySelector("[name='CardURL']")
const frmCardTitle = document.querySelector("[name='CardTitle']")
const frmCardClose = document.querySelector('#frmCard *.btn-close')

const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards")
const validationProp = {
    formSelector: ".popup",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-submit",
    inactiveButtonClass: "popup__btn-submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

init();
function init() {
    const initialCards = [
        {
            name: "Yosemite Valley",
            link: "https://code.s3.yandex.net/web-code/yosemite.jpg"

        },
        {
            name: "Lake Louise",
            link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
        },
        {
            name: "Bald Mountains",
            link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
        },
        {
            name: "Latemar",
            link: "https://code.s3.yandex.net/web-code/latemar.jpg"
        },
        {
            name: "Vanoise National Park",
            link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
        },
        {
            name: "Lago di Braies",
            link: "https://code.s3.yandex.net/web-code/lago.jpg"
        }
    ];
    initialCards.forEach(elm => insertCard(elm));

    overlayClose.forEach(elm => elm.addEventListener("click", closeModalWindow))
    enableValidation(validationProp);

}

function openModalWindow(modalWindow) {

    modalWindow.classList.add("overlay_visible");
}

function closeModalWindow(e) {
    e.target.closest(".overlay").classList.remove("overlay_visible");

}

//Profile
function profileEditHandler() {
    frmProfileName.value = profileName.textContent
    frmProfileTitle.value = profileTitle.textContent
    openModalWindow(frmProfile);
}


function frmProfileSubmitHandler(e) {
    e.preventDefault();
    profileName.textContent = frmProfileName.value
    profileTitle.textContent = frmProfileTitle.value
    closeModalWindow(e)
}

// Card
function insertCard(dataObj) {

    const card = cardTemplate.querySelector(".card").cloneNode(true);
    const cardName = card.querySelector(".card__name")
    const cardImg = card.querySelector(".card__img")
    const cardLike = card.querySelector(".card__like")
    const cardDelete = card.querySelector(".card__delete-card")

    cardName.textContent = dataObj.name
    cardImg.setAttribute("src", dataObj.link)
    cardImg.setAttribute("alt", dataObj.name)

    cardLike.addEventListener("click", cardLikeHandler)
    cardDelete.addEventListener("click", cardDeleteHandler)
    cardImg.addEventListener("click", cardImgHandler)
    cardsList.prepend(card);
}

function cardLikeHandler(e) {
    e.target.classList.toggle("btn-like_state_active")
}
function cardDeleteHandler(e) {
    e.target.closest(".card").remove();
}

function cardAddHandler() {
    document.forms["frmCard"].reset();

    openModalWindow(frmCard);

}

function frmCardSubmitHandler(e) {
    e.preventDefault();
    const cardData = { name: frmCardTitle.value, link: frmCardUrl.value };
    insertCard(cardData)
    closeModalWindow(e)
}
function cardImgHandler(e) {
    const overlayImgContiner = document.querySelector("#overlayImage")
    const overlayPic = document.querySelector(".overlay__img")
    const overlayPicTitle = document.querySelector(".overlay__text")
    const link = e.target.getAttribute("src")
    const name = e.target.getAttribute("alt")

    overlayPic.setAttribute("src", link)
    overlayPic.setAttribute("alt", name)
    overlayPicTitle.textContent = name
    openModalWindow(overlayImgContiner)


}

/// Event Listeners
profileEdit.addEventListener("click", profileEditHandler);
profileAddCard.addEventListener("click", cardAddHandler)

frmProfile.addEventListener("submit", frmProfileSubmitHandler);

frmCard.addEventListener("submit", frmCardSubmitHandler);



