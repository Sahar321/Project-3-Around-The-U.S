import PopupWithForm from "./PopupWithForm";

export default class PopupWithSubmit extends PopupWithForm {
    setAction(action) {
        this._submitHandler = action
    }

    /*     setEventListeners() {
            this._form.addEventListener("submit", this._submitHandler)
            super.setEventListeners()
        } */

}