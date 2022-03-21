export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this.close = this.close.bind(this)
    }

    open() {
        this._popup.classList.add("overlay_visible")
        this.setEventListeners()
    }


    close() {
        this._popup.classList.remove("overlay_visible")
        this._popup.removeEventListener("mousedown", this._handleClose)
        document.removeEventListener("keydown", this._handleEscClose)

    }


    _handleEscClose = (e) => {

        if (e.key === "Escape") {
            this.close();
        }
    }

    _handleClose = (e) => {
        const elmClassList = e.target.classList;
        if (elmClassList.contains("overlay__btn-close") || elmClassList.contains("overlay")) {
            e.stopPropagation();
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", this._handleClose)
        document.addEventListener("keydown", this._handleEscClose)
    }
}