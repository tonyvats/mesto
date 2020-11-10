import { openPopup, popupFullScreen, popupPhotoTitle, popupPhotoContainer } from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this._linkElement = data.link;
        this._nameElement = data.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);

        return cardElement;
    }
    
    _handleLikeIcon() {
        this._element.querySelector('.photo-grid__like-btn').classList.toggle('photo-grid__like-btn_active');
    }

    _handleDeleteCard() {
        this._element.closest('.photo-grid__item').addEventListener('click', () => {
            const listItem = this._element.closest('.photo-grid__item');    
            listItem.remove();
        });
    }
  
    _handlePreviewPicture() {
        popupFullScreen.src = this._linkElement;
        popupPhotoTitle.textContent = this._nameElement;
        openPopup(popupPhotoContainer);
    };

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.photo-grid__image').src = this._linkElement;
        this._element.querySelector('.photo-grid__title').textContent = this._nameElement;
        
        this._element.querySelector('.photo-grid__delete-btn')
        .addEventListener('click', () => this._handleDeleteCard());

        this._element.querySelector('.photo-grid__like-btn')
        .addEventListener('click', () => this._handleLikeIcon());

        this._element.querySelector('.photo-grid__image')
        .addEventListener('click', () => this._handlePreviewPicture());

        return this._element;
    }
    
}