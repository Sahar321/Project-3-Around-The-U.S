let formSelector
let inputSelector
let submitButtonSelector
let inactiveButtonClass
let inputErrorClass
let errorClass

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
};


const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(`.${inputElement.id}-error`)
    inputElement.classList.remove(errorClass);
    errorElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
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
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};
const setEventListeners = (formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {

            checkInputValidity(formElement, inputElement);
        });
    });
};



const enableValidation = (prop) => {
    formSelector = prop.formSelector
    inputSelector = prop.inputSelector
    submitButtonSelector = prop.submitButtonSelector
    inactiveButtonClass = prop.inactiveButtonClass
    inputErrorClass = prop.inputErrorClass
    errorClass = prop.errorClass

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();

        });

    });
};



export default enableValidation