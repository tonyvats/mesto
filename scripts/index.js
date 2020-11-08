import { initialCards } from './constants.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';

// Кнопки
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const clsButtonEdit = document.querySelector('.popup__close-btn_edit');
const clsButtonUpdate = document.querySelector('.popup__close-btn_update');
const clsButtonFullScreen = document.querySelector('.popup__close-btn_photo-fullscreen');
const safeUpdateButton = document.querySelector('.popup__save-btn_update');
const imageButton = document.querySelector('.photo-grid__image'); 


// Попапы
const editPopupContainer = document.querySelector('.popup_edit');
const updatePopupContainer = document.querySelector('.popup_update');
export const popupFullScreen = document.querySelector('.popup__photo-fullscreen');
export const popupPhotoContainer = document.querySelector('.popup__photo');
export const popupPhotoTitle = document.querySelector('.popup__photo-title');

//Формы
const popupFormEdit = document.forms.edit;
const popupFormUpdate = document.forms.update;


//Инпуты
const nameInput= popupFormEdit.elements.nameInput;
const jobInput= popupFormEdit.elements.jobInput;
const titleInput= popupFormUpdate.elements.titleInput;
const linkInput= popupFormUpdate.elements.linkInput;

//Профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Грид
const photoGrid = document.querySelector('.photo-grid');




initialCards.forEach((item) => {
    const card = new Card(item, '#photo-grid__item-template');
    const cardElement = card.generateCard();
    photoGrid.append(cardElement);
}); 


// Клик по оверлей
function clickOnOverlay(item) { 
    const popup = item.currentTarget;
    if (item.target !== popup){
        return;
    } else {
        closePopup(popup)
    }   
}

//проверяем клик по esc
function escpListener(evt) {
    const popup = document.querySelector('.popup_opened');
    return (evt.key === 'Escape') ? closePopup(popup) : false;
}

//Функция открытия попап
export function openPopup(item) {

    document.addEventListener('keydown', escpListener);
    item.classList.add('popup_opened')

}

//Функция закрытия попапа
export function closePopup(item) {
    document.removeEventListener('keydown', escpListener);
    item.classList.remove('popup_opened');
}

//Функция для редактирования формы профиля
function editProfile (evt) {
    evt.preventDefault();    
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
    closePopup(editPopupContainer);
}

//Функция на добавление новой карточки
function addCard (evt) {
    evt.preventDefault();

    const data = {
        link: linkInput.value,
        name: titleInput.value
    };

    const card = new Card(data, '#photo-grid__item-template');
    const cardElement = card.generateCard();

    photoGrid.prepend(cardElement)
    titleInput.value = "";
    linkInput.value = "";
    closePopup(updatePopupContainer);
}

//Вешаю слушателей
popupFormEdit.addEventListener('submit', editProfile);
popupFormUpdate.addEventListener('submit', addCard);
addButton.addEventListener('click', function() {
    openPopup(updatePopupContainer)
    safeUpdateButton.classList.add('popup__save-btn_inactive');
    safeUpdateButton.setAttribute('disabled', 'true');
});
editButton.addEventListener('click', function () {
    openPopup(editPopupContainer);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});
editPopupContainer.addEventListener('click', clickOnOverlay);
updatePopupContainer.addEventListener('click', clickOnOverlay);
popupPhotoContainer.addEventListener('click', clickOnOverlay);
clsButtonFullScreen.addEventListener('click', () => closePopup(popupPhotoContainer));
clsButtonEdit.addEventListener('click', () => closePopup(editPopupContainer));
clsButtonUpdate.addEventListener('click', () => closePopup(updatePopupContainer));
