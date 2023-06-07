export class UserInfo {
    constructor({selectorName, selectorDescription}) {
        this._profileName = document.querySelector(selectorName);
        this._profileDescription = document.querySelector(selectorDescription);
    }

    getUserInfo() {
        return {profileName: this._profileName.textContent, profileDescription: this._profileDescription.textContent};
    }

    setUserInfo({name, description}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
}