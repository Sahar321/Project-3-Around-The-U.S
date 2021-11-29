/// imports
import enableValidation from './validate.js';

/// Variables
const overlayList = document.querySelectorAll(".overlay")
const overlayListBtnClose = document.querySelectorAll(".overlay__btn-close")

const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')
const profileAddCard = document.querySelector('.profile__add')

const formProfile = document.querySelector('#formProfile')
const formProfileName = document.querySelector("[name='profileName']")
const formProfileTitle = document.querySelector("[name='profileTitle']")
    //const formProfileClose = document.querySelector('#formProfile *.btn-close')

const formCard = document.querySelector('#formCard')
const formCardUrl = document.querySelector("[name='CardURL']")
const formCardTitle = document.querySelector("[name='CardTitle']")
    //const formCardClose = document.querySelector('#formCard *.btn-close')
const formValidateProp = {

    formSelector: ".popup",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-submit",
    inactiveButtonClass: "popup__btn-submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"



};

const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".cards")



init();

function init() {

    const initialCards = [{
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

    overlayList.forEach(elm => elm.addEventListener("click", overlayClickHandler))
    overlayListBtnClose.forEach(elm => elm.addEventListener("click", closePopup))

    // validation
    enableValidation(formValidateProp);

}

function openPopup(popup) {
    popup.classList.add("overlay_visible")
}

function closePopup(evt) {
    let overlayVisible = document.querySelector(".overlay_visible")
    overlayVisible.classList.remove("overlay_visible")
}




//////////Handlers///////////////
// document
function KeyUpHandler(evt) {
    const overlayVisible = document.querySelector(".overlay_visible")

    switch (evt.keyCode) {
        case 27: //Esc
            if (overlayVisible !== null) {
                closePopup(evt)
            }

            break;
    }

}



// Overlay
function overlayClickHandler(evt) {
    const elm = evt.target
        //Make sure the parent("overlay") element is clicked
    if (elm.classList.contains("overlay_visible")) {
        closePopup(evt)
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

function cardLikeHandler(evt) {
    evt.target.classList.toggle("btn-like_state_active")
}

function cardDeleteHandler(evt) {
    evt.target.closest(".card").remove();
}

function cardAddHandler() {
    document.forms["formCard"].reset();

    openPopup(formCard);

}

function formCardSubmitHandler(evt) {
    evt.preventDefault();
    const cardData = { name: formCardTitle.value, link: formCardUrl.value };
    insertCard(cardData)
    closePopup(evt)
}

function cardImgHandler(evt) {
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
profileAddCard.addEventListener("click", cardAddHandler)


formProfile.addEventListener("submit", formProfileSubmitHandler);

formCard.addEventListener("submit", formCardSubmitHandler);

document.addEventListener("keyup", KeyUpHandler);