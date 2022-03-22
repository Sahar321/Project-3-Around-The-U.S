import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImage = this._popup.querySelector(".overlay__img")

    }
    open({ cardTitle, cardURL }) {
        const title = this._popup.querySelector(".overlay__text")
        this._popupImage.src = cardURL
        this._popupImage.alt = cardTitle
        title.textContent = cardTitle
        this.setEventListeners();
        super.open()
    }

}