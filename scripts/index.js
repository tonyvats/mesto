// let container = document.querySelector('.content');
let editButton = document.querySelector('.edit-btn');

let editPopup = document.querySelector('.popup');
let editPopupContainer = document.querySelector('.popup__container');
let clsButton = document.querySelector('.close-btn');

let formElement = document.querySelector('.form-element');
let saveButton = document.querySelector('.save-btn');


function openPopup() {
    editPopup.classList.add('popup_opened');
}

function closePopup() {
    editPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();


    let nameInput = document.querySelector('.popup__input_name');
    let jobInput = document.querySelector('.popup__input_job');

    let nameProfile = nameInput.value;
    let jobProfile = jobInput.value;

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitile = document.querySelector('.profile__subtitle');

    profileTitle.textContent = nameProfile;
    profileSubtitile.textContent = jobProfile;

    editPopup.classList.remove('popup_opened');
    
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', openPopup);

clsButton.addEventListener('click', closePopup);
console.log(clsButton.addEventListener('click', closePopup));