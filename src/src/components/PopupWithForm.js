import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler
        this._form = this._popup.querySelector(".form")
        this._handleSubmit = this._handleSubmit.bind(this)
        this._submitButton = this._popup.querySelector(".popup__btn-submit")

        console.log(popupSelector)

        this._submitButtonTextBeforeLoading = this._submitButton.textContent
    }
    _getInputValues() {
        this._inputValues = {}
        this._inputsList = [...this._form.querySelectorAll(".popup__input")]
        this._inputsList.forEach(input => this._inputValues[input.name] = input.value)
        return this._inputValues
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._handleSubmit)
        super.setEventListeners()
    }

    setAction(action) {
        this._submitHandler = action
    }

    _setLoading() {
        this._submitButton.textContent += "..."
        this._submitButton.disabled = true;
    }

    _removeLoading() {
        this._submitButton.textContent = this._submitButtonTextBeforeLoading
        this._submitButton.disabled = false;
    }
    _handleSubmit(e) {
        e.preventDefault()
        this._setLoading()
        this._submitHandler(this._getInputValues())
    }
    close() {
        this._form.removeEventListener("submit", this._handleSubmit)
        this._form.reset();

        super.close()
        this._removeLoading();
    }

}