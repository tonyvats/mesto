export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);        
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.remove('popup_opened');
    }

    clickOnOverlay(evt) {
        if (evt.target.classList.contains('popup_opened')) { 
            this.close();
        }    
    }

    setEventListeners() {
        const closeButton = this._popupSelector.querySelector('.popup__close-btn');
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popupSelector.addEventListener('click', this.clickOnOverlay.bind(this));
    }
}