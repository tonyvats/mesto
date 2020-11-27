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

} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const fullScreenPopup = new PopupWithImage(popupPhotoContainer);
fullScreenPopup.setEventListeners(); 



const createCard = (data) => {
    const card = new Card({
        data,
        handleCardClick: (initialCard) => {
            fullScreenPopup.open(initialCard);
            }
        },
        '#photo-grid__item-template'
    );
    const cardElement = card.generateCard();
    return cardElement
}



const cards = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        cards.prependItem(createCard(cardItem));
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
        userInfo.setUserInfo(formData); 
    }
});

const updatePopup = new PopupWithForm({
    popupSelector: updatePopupContainer,
	handleFormSubmit: (formData) => {
        cards.prependItem(createCard(formData));
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
    updateFormValidator.disableButton();
});
editButton.addEventListener('click', function() {
    editPopup.open();
    const data = userInfo.getUserInfo()
    nameInput.value = data.nameInput;
    jobInput.value = data.jobInput; 
});
