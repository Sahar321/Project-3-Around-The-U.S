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
        super.open()
    }


    setEventListeners() {
        this._popupImage.addEventListener("click", this.close)
        super.setEventListeners();

    }

    close() {
        this._popupImage.removeEventListener("click", this.close)
        super.close()
    }
}