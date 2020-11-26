import Popup from "./Popup"

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popupSelector.querySelector('.popup__photo-fullscreen')
        this._popupTitle = this._popupSelector.querySelector('.popup__photo-title')
    }

    open(data) {
        super.open();
        this._popupPhoto.src = data.link;
        this._popupTitle.textContent = data.name;
    }
}