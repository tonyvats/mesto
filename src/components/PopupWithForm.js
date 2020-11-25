const { default: Popup } = require("./Popup");

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
            });
        return this._formValues;
    }

    setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => { 
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
            });

        super.setEventListeners();
        this.close();
    }
  
    close() {
        super.close();
        this._popupSelector.querySelector('.popup__form').reset();
    }

  };
