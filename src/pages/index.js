import { 
    validationParams, 
    avatar,
    avatarLinkInput,
    editButton, 
    avatarButton,
    addButton,
    editPopupContainer,
    updatePopupContainer,
    popupPhotoContainer,
    popupFormEdit,
    popupFormUpdate,
    popupSubmitContainer,
    popupEditAvatarContainer,
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
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import './index.css';


const fullScreenPopup = new PopupWithImage(popupPhotoContainer);
fullScreenPopup.setEventListeners(); 

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        "Authorization": "6b4f0e7a-6b81-4fab-971b-4da07f00c7c0",
        'Content-Type': 'application/json'
    }
});

let userId = null;

function initiateCards(data) {
    const card = new Card({
        data,
        userId,
        handleCardClick: (cardList) => {
            fullScreenPopup.open(cardList);
        },
        handleDeleteIconClick: (cardId, cardItem) => {
            deleteCardPopup.open({cardId, cardItem})
            deleteCardPopup.setEventListeners();
        },
        handleLikeClick: (cardId) => {
            if (card.isLiked()) {
                api.removeLikeCard(cardId)
                    .then((data) => {
                        card.updateLikesData(data);
                    })
                    .catch((err) => console.log(err));
            } else {
                api.makeLikeCard(cardId)
                    .then((data) => {
                        card.updateLikesData(data);
                    })
                    .catch((err) => console.log(err));
            }
        }
    },
        '#photo-grid__item-template'
    );
    const cardElement = card.generateCard();

    return cardElement;
}

const cardList = new Section({
    renderer: (cardItem) => {
    cardList.prependItem(initiateCards(cardItem));
        } 
    },
    photoGrid
);

const cards = api.getCardsInformation();
cards.then((data) => {
    cardList.renderItems(data);
})
.catch((err) => console.log(err));

const userInfoData = new UserInfo(
    profileTitle, 
    profileSubtitle,
    avatar
);

const getUserInfoFromServer = api.getUserInfoFromServer();
getUserInfoFromServer.then((data) => {
    userInfoData.setUserInfoForPopup(data);
    userId = data._id;
})
.catch((err) => alert(err));

const editAvatarPopup = new PopupWithForm({
    popupSelector: popupEditAvatarContainer,
    handleFormSubmit: (formData) => {
        loadingButtonStatus(popupEditAvatarContainer, true);
        api.editProfileAvatar({
            avatar: formData.avatar
        }).then((data) => {
            userInfoData.setUserInfoForPopup(data);
            loadingButtonStatus(popupEditAvatarContainer, false);
        })
        .catch((err) => console.log(err));
    }
});

const editPofileDataPopup = new PopupWithForm({
	popupSelector: editPopupContainer,
	handleFormSubmit: (formData) => {
        loadingButtonStatus(editPopupContainer, true);
        api.setUserInfoOnServer(formData)
            .then((data) => {
                userInfoData.setUserInfoForPopup(data); 
                loadingButtonStatus(editPopupContainer, false);
             })
            .catch((err) => console.log(err));
    }
});

const addCardPopup = new PopupWithForm({
    popupSelector: updatePopupContainer,
	handleFormSubmit: (formData) => {
        loadingButtonStatus(updatePopupContainer, true);
        api.addCards({
			name: formData.name,
			link: formData.link
        }).then(data => {
            cardList.addItem(initiateCards(data));
            loadingButtonStatus(updatePopupContainer, false);
        })
        .catch((err) => console.log(err));
    }
});

const deleteCardPopup = new PopupWithSubmit({
    popupSelector: popupSubmitContainer,
    handleFormSubmit: ({cardId, cardItem}) => {
        api.deleteCard(cardId)
            .then(() => {
                cardItem.remove();
                deleteCardPopup.close();
            })
            .catch((err) => console.log(err));
    }
});

function loadingButtonStatus (popup, loadingstatus) {
    // const popupFormButton = updatePopupContainer.querySelector('.popup__save-btn')
    const popupFormButton = document.querySelector(popup).querySelector('.popup__save-btn');
    // console.log(document.querySelector(popup));
    // console.log(popupFormButton);
    // console.log(popupFormButton);
    if (loadingstatus) {
        popupFormButton.textContent = 'Сохранение...';
    } else {
        popupFormButton.textContent = 'Сохранить';
    }



    // loadingstatus ? popupFormButton.textContent = 'Сохранение...' : popupFormButton.textContent = 'Сохраненить';
}

// console.log(loadingButtonStatus(updatePopupContainer, true));


const editFormValidator = new FormValidator(validationParams, popupFormEdit);
editFormValidator.enableValidation();
const updateFormValidator = new FormValidator(validationParams, popupFormUpdate);
updateFormValidator.enableValidation();
editPofileDataPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarButton.addEventListener('click', function() {
    editAvatarPopup.open();
    editAvatarPopup.setEventListeners()
    const data = userInfoData.getCurrentUserInfo()
    avatarLinkInput.value = data.avatar.src;
});
addButton.addEventListener('click', function() {
    addCardPopup.open();
    updateFormValidator.disableButton();
});
editButton.addEventListener('click', function() {
    editPofileDataPopup.open();
    const data = userInfoData.getCurrentUserInfo()
    nameInput.value = data.nameInput;
    jobInput.value = data.jobInput; 
});