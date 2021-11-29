let config = {
    formSelector: null,
    inputSelector: null,
    submitButtonSelector: null,
    inactiveButtonClass: null,
    inputErrorClass: null,
    errorClass: null
}
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorClass);
};


const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(config.errorClass);
    errorElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {

        hideInputError(formElement, inputElement);

    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};



const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};
const setEventListeners = (formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {

            checkInputValidity(formElement, inputElement);
        });
    });
};



export const enableValidation = (formConfig) => {
    config = formConfig
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();

        });

    });
};