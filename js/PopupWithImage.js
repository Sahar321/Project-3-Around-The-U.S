import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._popupImage = document.querySelector(".overlay__img")
    }

    open({ CardTitle, CardURL }) {
        const title = this._popup.querySelector(".overlay__text")
        this._popupImage.src = CardURL
        title.textContent = CardTitle
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