export default class Card {
    constructor({ data, userId, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
        this._data = data;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;

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

    isLiked() {
        return (this._data.likes.some(userData => userData._id === this._userId)) ? true : false;
        // [12, 5, 8, 1, 4].some(elem => elem > 10);
    }

    updateLikesData(data) {
        this._data = data;
        this._likeCounter.textContent = this._data.likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('photo-grid__like-btn_active');
        } else {
            this._likeButton.classList.remove('photo-grid__like-btn_active');
        }
    }

    _validateDeleteButton() {
         if (this._data.owner._id !== this._userId) {
            this._deleteCardButton.remove();
        } 
        
    }

    handleCardClick() {
        this._handleCardClick(this._data);
    }

    _setEventListeners(){
        this._likeCounter = this._element.querySelector('.photo-grid__like-count');
        this._likeButton = this._element.querySelector('.photo-grid__like-btn');
        this._deleteCardButton = this._element.querySelector('.photo-grid__delete-btn');

        this._deleteCardButton.addEventListener('click', () => {
                this._handleDeleteIconClick(this._data._id, this._element);
            });
        
        this._likeButton.addEventListener('click', () => {
                this._handleLikeClick(this._data._id);
            });
        this._element.querySelector('.photo-grid__image')
        .addEventListener('click', () => this.handleCardClick());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._validateDeleteButton();
        this._element.querySelector('.photo-grid__image').src = this._data.link;
        this._element.querySelector('.photo-grid__title').textContent = this._data.name;
        this._element.querySelector('.photo-grid__like-count').textContent = this._data.likes.length;
        

        return this._element;
    }
    
}