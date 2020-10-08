let editButton = document.querySelector('.profile__edit-btn');

let popup = document.querySelector('.popup');
let editPopupContainer = document.querySelector('.popup_edit');
let updatePopupContainer = document.querySelector('.popup_update');

let clsButtonEdit = document.querySelector('.popup__close-btn_edit');
let clsButtonUpdate = document.querySelector('.popup__close-btn_update');

let popupFormEdit = document.querySelector('.popup__form_edit');
let popupFormUpdate = document.querySelector('.popup__form_update');
let saveButton = document.querySelector('.save__btn');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let titleInput = document.querySelector('.popup__input_title');
let linkInput = document.querySelector('.popup__input_link');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitile = document.querySelector('.profile__subtitle');

let addButton = document.querySelector('.profile__add-btn');

let photoGrid = document.querySelector('.photo-grid');


const initialCards = [
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

function creatGridItem(nameElement, linkElement) {
    const photoGridItemTemplate = document.querySelector('#photo-grid__item-template').content;
    const photoGridItem = photoGridItemTemplate.cloneNode(true);
    photoGridItem.querySelector('.photo-grid__image').src = linkElement;
    photoGridItem.querySelector('.photo-grid__title').textContent = nameElement;
    
    const likeButton = photoGridItem.querySelector('.photo-grid__like-btn');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-grid__like-btn_active')
    }); 

    photoGrid.prepend(photoGridItem);

}

function renderCard(array) {

    for (let i=0; i < array.length; i++){
        const arrayElement = array[i];
        const nameElement = arrayElement.name;
        const linkElement = arrayElement.link;
        creatGridItem(nameElement, linkElement);
    }
}

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

function editProfile (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitile.textContent = jobInput.value; 
    closePopup(editPopupContainer);
}

function addCard (evt) {
    evt.preventDefault();
    let strObject = {};
    strObject['name'] = titleInput.value;
    strObject['link'] = linkInput.value;
    creatGridItem(strObject['name'], strObject['link']);
    closePopup(updatePopupContainer);
}


popupFormEdit.addEventListener('submit', editProfile);
popupFormUpdate.addEventListener('submit', addCard);

addButton.addEventListener('click', () => openPopup(updatePopupContainer));
editButton.addEventListener('click', () => openPopup(editPopupContainer));

clsButtonEdit.addEventListener('click', () => closePopup(editPopupContainer));
clsButtonUpdate.addEventListener('click', () => closePopup(updatePopupContainer));

renderCard(initialCards);