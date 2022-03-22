import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler
        this._form = this._popup.querySelector(".form")
        this._handleSubmit = this._handleSubmit.bind(this)

    }

    _getInputValues() {
        const inputValues = {}
        const inputsList = [...this._form.querySelectorAll(".popup__input")]
        inputsList.forEach(input => inputValues[input.name] = input.value)
        return inputValues
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._handleSubmit)
        super.setEventListeners()
    }

    _handleSubmit(e) {
        e.preventDefault()
        this._submitHandler(this._getInputValues())
        this.close()
    }
    close() {
        this._form.removeEventListener("submit", this._handleSubmit)
        this._form.reset();

        super.close()
    }

}