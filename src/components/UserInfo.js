export class UserInfo {
    constructor({selectorName, selectorDescription}) {
        this._profileName = document.querySelector(selectorName);
        this._profileDescription = document.querySelector(selectorDescription);
    }

    getUserInfo() {
        const data= {};
        data.description = this._profileDescription.textContent;
        console.log(data.description);
        data.name = this._profileName.textContent;
        console.log(data.name);
        console.log(data);
        return data;
    }
   
    setUserInfo({name,description}) {
        console.log(this._profileName);
        console.log(name);
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
    
}