export default class Card {
    constructor(cardData, selector, cardClick) {
        this._handleCardClick = cardClick
        this._cardTitle = cardData.cardTitle
        this._cardURL = cardData.cardURL
        this._cardTemplate = document.querySelector(selector).content;


    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._handleLikeCard)
        this._cardDelete.addEventListener("click", this._handleDeleteCard)
        this._cardImg.addEventListener("click", this._handleClick)
    }


    _handleClick = () => {
        const data = {
            cardURL: this._cardImg.getAttribute("src"),
            cardTitle: this._cardImg.getAttribute("alt"),
        }

        this._handleCardClick(data)
    }

    _handleLikeCard = () => {
        this._cardLike.classList.toggle("btn-like_state_active");
        //     evt.target.classList.toggle("btn-like_state_active")
    }

    _handleDeleteCard = () => {
        this._card.remove();
        this._card = null;
    }


    createCard() {
        this._card = this._cardTemplate.querySelector(".card").cloneNode(true);
        const _cardName = this._card.querySelector(".card__name")
        this._cardImg = this._card.querySelector(".card__img")
        this._cardLike = this._card.querySelector(".card__like")
        this._cardDelete = this._card.querySelector(".card__delete-card")
        _cardName.textContent = this._cardTitle
        this._cardImg.setAttribute("src", this._cardURL)
        this._cardImg.setAttribute("alt", this._cardTitle)
        this._setEventListeners()
        return this._card
    }

}