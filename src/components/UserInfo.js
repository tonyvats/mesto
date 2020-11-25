import { profileTitle, profileSubtitle } from '../utils/constants.js';


export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }
        
    getUserInfo() {
        const  userInfoData = {
            nameInput: this._name.textContent,
            jobInput: this._job.textContent
        }
        return userInfoData;
    }

    setUserInfo() {
        profileTitle.textContent = this._name;
        profileSubtitle.textContent = this._job;
    }
}