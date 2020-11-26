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

    setUserInfo({ nameInput, jobInput }) {
        this._name.textContent = nameInput;
        this._job.textContent = jobInput;
    }
}