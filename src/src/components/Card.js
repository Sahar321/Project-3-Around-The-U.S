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
        this._cardElement = this._cardTemplate.querySelector(".card").cloneNode(true);
        this._cardLikesCount = this._cardElement.querySelector(".card__like-counter")
        this._cardLike = this._cardElement.querySelector(".card__like")
    }
    _setEventListeners() {

        this._cardLike.addEventListener("click", () => this._handleCardLike(this))

        if (this._cardDeleteElm != null) {
            this._cardDeleteElm.addEventListener("click", () => this._handleCardDelete(this))
        }

        this._cardImgElm.addEventListener("click", () => {
            const data = { link: this._cardImgElm.src, name: this._cardImgElm.alt }
            this._handleCardClick(data)
        })
    }

    removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    isLiked() {
        return this._likes.some(like => like._id === this.userId)
    }

    toggleLike(likesResponse) {
        if (this.isLiked()) {
            this._cardLike.classList.remove("btn-like_state_active")
        } else {
            this._cardLike.classList.add("btn-like_state_active")
        }
        this._likes = likesResponse
        this._cardLikesCount.textContent = this._likes.length
    }
    createCard() {
        const cardNameElm = this._cardElement.querySelector(".card__name")
        this._cardImgElm = this._cardElement.querySelector(".card__img")
        this._cardDeleteElm = this._cardElement.querySelector(".card__delete-card")

        cardNameElm.textContent = this._name
        this._cardLikesCount.textContent = this._likes.length
        this._cardImgElm.setAttribute("src", this._link)
        this._cardImgElm.setAttribute("alt", this._name)

        this._likes.forEach(card => {
            if (card._id === this.userId) {
                this._cardLike.classList.add("btn-like_state_active")
            }
        });

        // remove delete button from cards that is not belongs to the user
        if (this.cardOwnerId != this.userId) {
            this._cardDeleteElm.remove()
            this._cardDeleteElm = null
        }

        this._setEventListeners()

        return this._cardElement
    }

}