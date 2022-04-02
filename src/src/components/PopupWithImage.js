import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImage = this._popup.querySelector(".overlay__img")
        this._title = this._popup.querySelector(".overlay__text")

    }
    open({ name, link }) {
        this._popupImage.src = link
        this._popupImage.alt = name
        this._title.textContent = name
        super.open()
    }

}