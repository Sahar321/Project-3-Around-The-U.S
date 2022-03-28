import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImage = this._popup.querySelector(".overlay__img")

    }
    open({ name, link }) {
        const title = this._popup.querySelector(".overlay__text")
        this._popupImage.src = link
        this._popupImage.alt = name
        title.textContent = name
        this.setEventListeners();
        super.open()
    }

}