export default class Card {
    constructor(cardData, selector, cardClick, cardDelete, cardLike, userId) {
        this._handleCardClick = cardClick
        this._handleCardDelete = cardDelete
        this._handleCardLike = cardLike

        this.userId = userId
        this.cardOwnerId = cardData.owner._id
        this.cardId = cardData._id

        this._name = cardData.name
        this._link = cardData.link
        this._likes = cardData.likes
        this._cardTemplate = document.querySelector(selector).content;
        this._card = this._cardTemplate.querySelector(".card").cloneNode(true);
        this._cardLikesCount = this._card.querySelector(".card__like-counter")
        this._cardLike = this._card.querySelector(".card__like")
    }
    _setEventListeners() {
        this._cardLike.addEventListener("click", () => this._handleCardLike(this.cardId))
        if (this._cardDeleteElm != null) {
            this._cardDeleteElm.addEventListener("click", () => this._handleCardDelete(this.cardId))
        }

        this._cardImgElm.addEventListener("click", () => {
            const data = { link: this._cardImgElm.src, name: this._cardImgElm.alt }
            this._handleCardClick(data)
        })
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    isLiked() {
        return this._likes.some(like => like._id === this.userId)
    }

    toggleLike(likesRespone) {
        if (this.isLiked()) {
            this._cardLike.classList.remove("btn-like_state_active")
        } else {
            this._cardLike.classList.add("btn-like_state_active")
        }
        this._likes = likesRespone
        this._cardLikesCount.textContent = this._likes.length
    }
    createCard(userId) {
        const cardNameElm = this._card.querySelector(".card__name")

        this._cardImgElm = this._card.querySelector(".card__img")
        this._cardDeleteElm = this._card.querySelector(".card__delete-card")

        cardNameElm.textContent = this._name
        this._cardLikesCount.textContent = this._likes.length
        this._cardImgElm.setAttribute("src", this._link)
        this._cardImgElm.setAttribute("alt", this._name)

        this._likes.forEach(card => {
            if (card._id === userId) {
                this._cardLike.classList.add("btn-like_state_active")
            }
        });

        // remove delete button from cards not related to user
        if (this.cardOwnerId != userId) {
            this._cardDeleteElm.remove()
            this._cardDeleteElm = null
        }

        this._setEventListeners()

        return this._card
    }

}