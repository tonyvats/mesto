// Создаем объект с селекторами элементов для валидации
const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__unput-error_active'
  }; 

//Обработчик для показа ошибки
function showInputError(formElement, inputElement, errorMesssage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationParams.inputErrorClass);
    errorElement.textContent = errorMesssage; 
    errorElement.classList.add(validationParams.errorClass);
  };
  
  //Обработчик для скрытие ошибки
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationParams.inputErrorClass);
    errorElement.textContent = ""; 
    errorElement.classList.remove(validationParams.errorClass);

  };
  
  // Проверяем валидность данных в поле
  function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
  };
  
  // Лисенер для элементов формы
  function setEventListeners(formElement, validationParams) {
      const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
      const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement)
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
  
  // Обработчик на наличие хотя бы одного инвалида
  function hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {  
        return !inputElement.validity.valid;
      })
    };
  
  // Обработчик доступности поля
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationParams.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(validationParams.inactiveButtonClass);
    }
  };


  
  // Лисенер для всех форм
  function enableValidation(validationParams) {
      const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
        formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        setEventListeners(formElement, validationParams);
      });
  };
    
  // Вызываем лисенер для всех полей 
  enableValidation(validationParams);