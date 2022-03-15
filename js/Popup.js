export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this.close = this.close.bind(this)
        this._handleClose = this._handleClose.bind(this)
    }

    open() {
        this._popup.classList.add("overlay_visible")
    }


    close() {
        this._popup.classList.remove("overlay_visible")
        this._popup.removeEventListener("click", this._handleClose)
    }


    _handleEscClose() { // arrow bind (this) ^^
        console.log("Escape EVENT FIRE")
        if (e.key === "Escape") {
            this.close();
        }
    }

    _handleClose(e) {
        const elmClassList = e.target.classList;
        if (elmClassList.contains("overlay__btn-close") || elmClassList.contains("overlay")) {
            e.stopPropagation();
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener("click", this._handleClose)
    }
}