let editButton = document.querySelector('.profile__edit-btn');

let popup = document.querySelector('.popup');
let editPopupContainer = document.querySelector('.popup_edit');
let updatePopupContainer = document.querySelector('.popup_update');

let clsButtonEdit = document.querySelector('.popup__close-btn_edit');
let clsButtonUpdate = document.querySelector('.popup__close-btn_update');

let formElement = document.querySelector('.popup__form');
let saveButton = document.querySelector('.save__btn');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitile = document.querySelector('.profile__subtitle');

let addButton = document.querySelector('.profile__add-btn');

let likeButton = document.querySelector('.photo-grid__like-btn');

function openPopup(item) {
    if (item.classList.contains('popup_update')){
        item.classList.add('popup_opened');
    } else if (item.classList.contains('popup_edit')) {
        item.classList.add('popup_opened');
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitile.textContent;
    }
}

function closePopup(item) {
    item.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitile.textContent = jobInput.value; 
    closePopup();
}

function likePucture(evt) {
    console.log(evt);
    evt.target.classList.toggle('photo-grid__like-btn_active')
}








formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', () => openPopup(updatePopupContainer));
editButton.addEventListener('click', () => openPopup(editPopupContainer));

clsButtonEdit.addEventListener('click', () => closePopup(editPopupContainer));
clsButtonUpdate.addEventListener('click', () => closePopup(updatePopupContainer));

