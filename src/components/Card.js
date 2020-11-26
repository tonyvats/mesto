export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._data = data;
        this._handleCardClick = handleCardClick;

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
        this._element.remove();
    }

    handleCardClick() {
        this._handleCardClick(this._data);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.photo-grid__image').src = this._data.link;
        this._element.querySelector('.photo-grid__title').textContent = this._data.name;
        
        this._element.querySelector('.photo-grid__delete-btn')
        .addEventListener('click', () => this._handleDeleteCard());

        this._element.querySelector('.photo-grid__like-btn')
        .addEventListener('click', () => this._handleLikeIcon());

        this._element.querySelector('.photo-grid__image')
        .addEventListener('click', () => this.handleCardClick());

        return this._element;
    }
    
}