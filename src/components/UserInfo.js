export default class UserInfo {
    constructor(name, job, userAvatar) {
        this._name = name;
        this._job = job;
        this._avatar = userAvatar;
    }
        
    getCurrentUserInfo() {
        const  userInfoData = {
            nameInput: this._name.textContent,
            jobInput: this._job.textContent,
            avatar: this._avatar
        }
        return userInfoData;
    }

    setUserInfoForPopup({ name, about, avatar }) {
        this._name.textContent = name;
        this._job.textContent = about;
        this._avatar.src = avatar;
    }
}