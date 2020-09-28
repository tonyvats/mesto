let editButton = document.querySelector('.profile__edit-btn');

let editPopup = document.querySelector('.popup');
let editPopupContainer = document.querySelector('.popup__container');
let clsButton = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.popup__form');
let saveButton = document.querySelector('.save__btn');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitile = document.querySelector('.profile__subtitle');

function openPopup() {
    editPopup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitile.textContent;
}

function closePopup() {
    editPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitile.textContent = jobInput.value; 
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', openPopup);

clsButton.addEventListener('click', closePopup);
console.log(clsButton.addEventListener('click', closePopup));