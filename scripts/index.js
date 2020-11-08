// Кнопки
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const clsButtonEdit = document.querySelector('.popup__close-btn_edit');
const clsButtonUpdate = document.querySelector('.popup__close-btn_update');
const clsButtonFullScreen = document.querySelector('.popup__close-btn_photo-fullscreen');
const safeUpdateButton = document.querySelector('.popup__save-btn_update');

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
const popupFormEdit = document.forms.edit;
const popupFormUpdate = document.forms.update;


//Инпуты
const nameInput= popupFormEdit.elements.nameInput;
const jobInput= popupFormEdit.elements.jobInput;
const emptyJobInputError = popupFormEdit.querySelector(`#${jobInput.id}-error`); 
const titleInput= popupFormUpdate.elements.titleInput;
const emptyTitleInputError = popupFormUpdate.querySelector(`#${titleInput.id}-error`); 
const linkInput= popupFormUpdate.elements.linkInput;
const emptyLinkInputError = popupFormUpdate.querySelector(`#${linkInput.id}-error`); 

//Профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Грид
const photoGrid = document.querySelector('.photo-grid');
const photoGridItemTemplate = document.querySelector('#photo-grid__item-template').content;


function creatGridItem(nameElement, linkElement) {
    //клонируем template блок
    const photoGridItem = photoGridItemTemplate.cloneNode(true);
    //наполняем содержимым
    photoGridItem.querySelector('.photo-grid__image').src = linkElement;
    photoGridItem.querySelector('.photo-grid__title').textContent = nameElement;
    
    //Кнопки лайка, удаления и фулскрина создаю здесь. Кажется, так логичнее.
    //Функция создает карточку и сразу все неоходимые кнопки. В итоге у каждой карточки своя кнопка. 
    const likeButton = photoGridItem.querySelector('.photo-grid__like-btn');
    const deleteButton = photoGridItem.querySelector('.photo-grid__delete-btn');
    const imageButton = photoGridItem.querySelector('.photo-grid__image'); 

    // Вешаем оброботчики
    likeButton.addEventListener('click', handleLikeIcon);
    deleteButton.addEventListener('click', () => handleDeleteCard(deleteButton));
    imageButton.addEventListener('click', () => handlePreviewPicture(linkElement, nameElement));

    return photoGridItem;
}


function handleLikeIcon(evt) {
    //изменяем иконку лайка 
    evt.target.classList.toggle('photo-grid__like-btn_active')
};

function handleDeleteCard(item) {
    //удаляем карточку
    const listItem = item.closest('.photo-grid__item');    
    listItem.remove();
};

function handlePreviewPicture(linkItem, nameItem) {
    //открывает попап с картинкой
    popupFullScreen.src = linkItem;
    popupPhotoTitle.textContent = nameItem;
    openPopup(popupPhotoContainer);
};

//Функция создания карточки
function renderCard(array) {
    array.forEach(element => {
        photoGrid.append(creatGridItem(element.name, element.link));
    });
}

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
    closePopup(editPopupContainer);
}


//Функция на добавление новой карточки
function addCard (evt) {
    evt.preventDefault();
    photoGrid.prepend(creatGridItem(titleInput.value, linkInput.value));
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

