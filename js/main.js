/// Variables
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


/// Event handlers
const Main = function () {
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
    initialCards.forEach(elm => InsertCard(elm.name, elm.link));

    overlayClose.forEach(elm => elm.addEventListener("click", overlayCloseHandler))
}();


function overlayCloseHandler(e) {
    e.target.closest(".overlay").classList.remove("overlay_visible");
}

//Profile
function profileEditHandler() {
    frmProfileName.value = profileName.textContent
    frmProfileTitle.value = profileTitle.textContent
    frmProfile.classList.add("overlay_visible")
}


function frmProfileSubmitHandler(e) {
    e.preventDefault();
    profileName.textContent = frmProfileName.value
    profileTitle.textContent = frmProfileTitle.value
    overlayCloseHandler(e)
}

// Card
function InsertCard(name, link) {
    const cardTamplte = document.querySelector("#card").content;
    const cardsList = document.querySelector(".cards")
    const card = cardTamplte.querySelector(".card").cloneNode(true);
    const cardName = card.querySelector(".card__name")
    const cardImg = card.querySelector(".card__img")
    const cardLike = card.querySelector(".card__like")
    const cardDelete = card.querySelector(".card__delete-card")

    cardName.textContent = name
    cardImg.setAttribute("src", link)
    cardImg.setAttribute("alt", name)

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
    frmCardTitle.value = ""
    frmCardUrl.value = ""
    frmCard.classList.add("overlay_visible")
}

function frmCardSubmitHandler(e) {
    e.preventDefault();
    InsertCard(frmCardTitle.value, frmCardUrl.value)
    overlayCloseHandler(e)
}
function cardImgHandler(e) {
    const txt = document.querySelector(".overlay__text")
    const img = document.querySelector(".overlay__img")
    const overlay = document.querySelector("#overlayImage")
    const link = e.target.getAttribute("src")
    const name = e.target.getAttribute("alt")

    img.setAttribute("src", link)
    img.setAttribute("alt", name)
    txt.textContent = name
    overlay.classList.add("overlay_visible")

}

/// Event Listeners



profileEdit.addEventListener("click", profileEditHandler);
profileAddCard.addEventListener("click", cardAddHandler)

frmProfile.addEventListener("submit", frmProfileSubmitHandler);

frmCard.addEventListener("submit", frmCardSubmitHandler);




