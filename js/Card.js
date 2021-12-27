//import { initialCards } from './initialData.js';
import { openPopup } from './utilits.js';


export default class Card {

    _overlayImgContiner
    _overlayPic
    _overlayPicTitle

    constructor(cardData, selector) {
        this._name = cardData.name
        this._link = cardData.link
        this._cardTemplate = document.querySelector(selector).content;

    }

    createCard() {
        this._card = this._cardTemplate.querySelector(".card").cloneNode(true);
        this._cardName = this._card.querySelector(".card__name")
        this._cardImg = this._card.querySelector(".card__img")
        this._cardLike = this._card.querySelector(".card__like")
        this._cardDelete = this._card.querySelector(".card__delete-card")
        this._cardName.textContent = this._name
        this._cardImg.setAttribute("src", this._link)
        this._cardImg.setAttribute("alt", this._name)


        this._setEventListeners()
        return this._card
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._handleLikeCard)
        this._cardDelete.addEventListener("click", this._handleDeleteCard)
        this._cardImg.addEventListener("click", this._openCardPreview)
    }

    _openCardPreview(evt) {
        this._overlayImgContiner = document.querySelector("#overlayImage")
        this._overlayPic = document.querySelector(".overlay__img")
        this._overlayPicTitle = document.querySelector(".overlay__text")

        this._src = evt.target.getAttribute("src")
        this._alt = evt.target.getAttribute("alt")
        this._overlayPic.setAttribute("src", this._src)
        this._overlayPic.setAttribute("alt", this._alt)
        this._overlayPicTitle.textContent = this._alt
        openPopup(this._overlayImgContiner)


    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle("btn-like_state_active")
    }

    _handleDeleteCard(evt) {
        evt.target.closest(".card").remove();
    }

}