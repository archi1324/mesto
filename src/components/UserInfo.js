export class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
        this._profileName = document.querySelector(selectorName);
        this._profileDescription = document.querySelector(selectorAbout);
        this._profileAvatar = document.querySelector(selectorAvatar);
        this._id = '';
    }

    getUserInfo() {
        const data= {};
        data.about = this._profileDescription.textContent;
        data.name = this._profileName.textContent;
        return data;
    }
   
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._profileAvatar.src = data.avatar;
    }
    
    setAvatarLink(link) {
        this._profileAvatar.src = link;
      }
}