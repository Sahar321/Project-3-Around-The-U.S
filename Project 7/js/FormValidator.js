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

  _checkInputValidity(inputElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {

      this._hideInputError(inputElement);

    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }.bind(this));
    });
  };

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();

    });
  };
}