import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
      }

      setEventListeners() {
        this._popup.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            this._handleFormSubmit(this._data);
        });
    
        super.setEventListeners();
    }


    open (data) {
        super.open()
        this._data = data
        // console.log(this._data);
      }
}