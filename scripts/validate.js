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
function showInputError(formElement, inputElement, errorMesssage, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMesssage; 
    errorElement.classList.add(errorClass);
  };
  
  //Обработчик для скрытие ошибки
  function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = ""; 
    errorElement.classList.remove(errorClass);

  };
  
  // Проверяем валидность данных в поле
  function isValid(formElement, inputElement, {...rest}) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, rest);
    }
  };
  
  // Лисенер для элементов формы
  function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
          isValid(formElement, inputElement, rest)
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
function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};


  // Лисенер для всех форм
  function enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
      formList.forEach((formElement) => {
      setEventListeners(formElement, rest);
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, rest);
    });
  };
    
  // Вызываем лисенер для всех полей 
  enableValidation(validationParams);