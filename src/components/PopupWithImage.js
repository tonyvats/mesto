const { default: Popup } = require("./Popup");

export default class PopupWithImage extends Popup{
    constructor(popupSelector, data) {
        super(popupSelector);
        this._data = data;
    }

    open() {
        super.open();

        document.querySelector('.popup__photo-fullscreen').src = this._data.link;
        document.querySelector('.popup__photo-title').textContent = this._data.name;
    }
}