import { 
    initialCards, 
    validationParams, 
    editButton, 
    addButton,
    safeUpdateButton,
    editPopupContainer,
    updatePopupContainer,
    popupPhotoContainer,
    popupFormEdit,
    popupFormUpdate,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    photoGrid

} from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo.js';
import './styles/index.css';

const cards = new Section({
    items: initialCards,
    renderer: (cardItem) => {

        const card = new Card({
            data: cardItem,
            handleCardClick: (initialCard) => {
                const fullScreenPopup = new PopupWithImage(popupPhotoContainer, initialCard);
                fullScreenPopup.open();
                fullScreenPopup.setEventListeners(); 
                }
            },
            '#photo-grid__item-template'
        );
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
        } 
    },
    photoGrid
);

const userInfo = new UserInfo(
    profileTitle, 
    profileSubtitle 
);

const editPopup = new PopupWithForm({
	popupSelector: editPopupContainer,
	handleFormSubmit: (formData) => {
        const userInfo = new UserInfo(
            formData.nameInput,
            formData.jobInput
        );
        userInfo.setUserInfo(); 
    }
});

const updatePopup = new PopupWithForm({
    popupSelector: updatePopupContainer,
	handleFormSubmit: (formData) => {
        const card = new Card({
            data: formData,
            handleCardClick: (initialCard) => {
                const fullScreenPopup = new PopupWithImage(popupPhotoContainer, initialCard);
                fullScreenPopup.open();
                fullScreenPopup.setEventListeners(); 
            }
        },
        '#photo-grid__item-template'
        );
        const cardElement = card.generateCard();
        photoGrid.prepend(cardElement)
    }
});


const editFormValidator = new FormValidator(validationParams, popupFormEdit);
editFormValidator.enableValidation();
const updateFormValidator = new FormValidator(validationParams, popupFormUpdate);
updateFormValidator.enableValidation();





cards.renderItems();
editPopup.setEventListeners();
updatePopup.setEventListeners();

addButton.addEventListener('click', function() {
    updatePopup.open();
    safeUpdateButton.classList.add('popup__save-btn_inactive');
    safeUpdateButton.setAttribute('disabled', 'true');
});
editButton.addEventListener('click', function() {
    editPopup.open();
    
    nameInput.value = userInfo.getUserInfo().nameInput;
    jobInput.value = userInfo.getUserInfo().jobInput;
    
});