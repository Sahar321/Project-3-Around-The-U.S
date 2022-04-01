import Popup from "./Popup.js";


export default class popupWithMessage extends Popup {
    constructor(selector) {
        super(selector)
        this._title = this._popup.querySelector(".popup__lbl-title")
        this._subtext = this._popup.querySelector(".popup__lbl-subtext")
        this._submit = this._popup.querySelector(".popup__btn-submit")

    }
    open({ title, subtext }, error) {
        if (error) {
            this._title.style.color = "red";
            this._subtext.style.color = "red";
        }


        this._title.textContent = title
        this._subtext.textContent = subtext
        this._setEventListeners()
        super.open()
    }


    handleClick = () => {
        this._submit.removeEventListener('click', this.handleClick)
        this.close()

    };

    _setEventListeners() {
        this._submit.addEventListener('click', this.handleClick)
    }


}