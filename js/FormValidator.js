export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement
        this._config = config
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.errorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.inputErrorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorClass);
        errorElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
    };



    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    };
    _checkInputValidity(inputElement) {
        inputElement.addEventListener("input", function() {
            this._toggleButtonState();
            if (!inputElement.validity.valid) {
                this._showInputError(inputElement, inputElement.validationMessage);
            } else {
                this._hideInputError(inputElement);

            }
        }.bind(this));
    };



    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            this._checkInputValidity(inputElement)
        })
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });

    };
}
