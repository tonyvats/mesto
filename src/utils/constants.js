export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__unput-error_active'
  };

export const editButton = document.querySelector('.profile__edit-btn');
export const addButton = document.querySelector('.profile__add-btn');
export const imageButton = document.querySelector('.photo-grid__image'); 
export const safeUpdateButton = document.querySelector('.popup__save-btn_update');
export const editPopupContainer = '.popup_edit';
export const updatePopupContainer = '.popup_update';
export const popupPhotoContainer = '.popup__photo';
export const popupPhotoTitle = document.querySelector('.popup__photo-title');
export const popup = document.querySelector('.popup_opened');
export const popupFormEdit = document.forms.edit;
export const popupFormUpdate = document.forms.update;
export const nameInput= popupFormEdit.elements.nameInput;
export const jobInput= popupFormEdit.elements.jobInput;
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const photoGrid = '.photo-grid';