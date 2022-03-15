export default class Card {
    constructor(cardData, selector, cardClick) {
        this._handleCardClick = cardClick
        this._CardTitle = cardData.CardTitle
        this._CardURL = cardData.CardURL
        this._cardTemplate = document.querySelector(selector).content;
        this._handleClick = this._handleClick.bind(this)

    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._handleLikeCard)
        this._cardDelete.addEventListener("click", this._handleDeleteCard)
        this._cardImg.addEventListener("click", this._handleClick)
    }


    _handleClick(e) {
        const data = {
            CardURL: e.target.getAttribute("src"),
            CardTitle: e.target.getAttribute("alt"),
        }

        this._handleCardClick(data)
    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle("btn-like_state_active")
    }

    _handleDeleteCard(evt) {
        evt.target.closest(".card").remove();
    }


    createCard() {
        this._card = this._cardTemplate.querySelector(".card").cloneNode(true);
        this._cardName = this._card.querySelector(".card__name")
        this._cardImg = this._card.querySelector(".card__img")
        this._cardLike = this._card.querySelector(".card__like")
        this._cardDelete = this._card.querySelector(".card__delete-card")
        this._cardName.textContent = this._CardTitle
        this._cardImg.setAttribute("src", this._CardURL)
        this._cardImg.setAttribute("alt", this._CardTitle)
        this._setEventListeners()
        return this._card
    }

}