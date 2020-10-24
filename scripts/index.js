// Кнопки
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const clsButtonEdit = document.querySelector('.popup__close-btn_edit');
const clsButtonUpdate = document.querySelector('.popup__close-btn_update');
const clsButtonFullScreen = document.querySelector('.popup__close-btn_photo-fullscreen');


// Попапы
const editPopupContainer = document.querySelector('.popup_edit');
const updatePopupContainer = document.querySelector('.popup_update');
const popupFullScreen = document.querySelector('.popup__photo-fullscreen');
const popupPhotoContainer = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
const popupContent = document.querySelector('.popup__content');
const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');

//Формы
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupFormUpdate = document.querySelector('.popup__form_update');

//Инпуты
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const titleInput = document.querySelector('.popup__input_title');
const linkInput = document.querySelector('.popup__input_link');

//Профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Грид
const photoGrid = document.querySelector('.photo-grid');
const photoGridItemTemplate = document.querySelector('#photo-grid__item-template').content;
// const photoGridItem = photoGridItemTemplate.cloneNode(true);


//Мок данных пока не подключили сервер
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
    //клонируем template блок
    const photoGridItem = photoGridItemTemplate.cloneNode(true);
    photoGridItem.querySelector('.photo-grid__image').src = linkElement;
    photoGridItem.querySelector('.photo-grid__title').textContent = nameElement;
    
    //Кнопки лайка, удаления и фулскрина создаю здесь. Кажется, так логичнее.
    //Функция создает карточку и сразу все неоходимые кнопки. В итоге у каждой карточки своя кнопка. 
    const likeButton = photoGridItem.querySelector('.photo-grid__like-btn');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-grid__like-btn_active')
    }); 

    const deleteButton = photoGridItem.querySelector('.photo-grid__delete-btn');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.photo-grid__item');    
        listItem.remove();
    });

    const imageButton = photoGridItem.querySelector('.photo-grid__image'); 
    imageButton.addEventListener('click', function () {
        popupFullScreen.src = linkElement;
        popupPhotoTitle.textContent = nameElement;
        openPopup(popupPhotoContainer);
    });

    return photoGridItem;
}

//Функция создания карточки
function renderCard(array) {
    array.forEach(element => {
        photoGrid.append(creatGridItem(element.name, element.link));
    });
}

//Вызов функции создания карточки
renderCard(initialCards);

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
    if (evt.key === 'Escape'){
        console.log( 'escape pressed' ); 
    }
    (editPopupContainer.classList.contains('popup_opened')) ? closePopup(editPopupContainer) : 
        (updatePopupContainer.classList.contains('popup_opened')) ? closePopup(updatePopupContainer) :
            closePopup(popupPhotoContainer);

}

//Функция открытия попап
function openPopup(item) {
    document.addEventListener('keydown', escpListener);
    item.classList.add('popup_opened')
}

//Функция закрытия попапа
function closePopup(item) {
    document.removeEventListener('keydown', escpListener);
    item.classList.remove('popup_opened');
}

//Функция для редактирования формы профиля
function editProfile (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value; 
}

//Функция на добавление новой карточки
function addCard (evt) {
    evt.preventDefault();
    photoGrid.prepend(creatGridItem(titleInput.value, linkInput.value));
    titleInput.value = "";
    linkInput.value = "";
}

//Вешаю обработчики на кнопки
popupFormEdit.addEventListener('submit', editProfile);
popupFormUpdate.addEventListener('submit', addCard);
addButton.addEventListener('click', () => openPopup(updatePopupContainer));
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

