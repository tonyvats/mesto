export default class FormValidator {
    constructor(validationParams, formElement) {
        this._formSelector = validationParams.formSelector;
        this._inputSelector = validationParams.inputSelector;
        this._submitButtonSelector = validationParams.submitButtonSelector;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorClass = validationParams.errorClass;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector)

    }

    _showInputError(formElement, inputElement, errorMesssage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMesssage; 
        errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = ""; 
        errorElement.classList.remove(this._errorClass);

    };
    
    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };
    
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._toggleButtonState(inputList, buttonElement);
            this._isValid(formElement, inputElement)
            });
        });
    };
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {  
            return !inputElement.validity.valid;
        })
    };
    
    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    enableValidation() {

        this._setEventListeners(this._formElement);
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    };
}


