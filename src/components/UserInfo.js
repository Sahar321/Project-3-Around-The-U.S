export default class UserInfo {
    constructor(data) {
        this._profileName = document.querySelector(data.profileNameSelector)
        this._profileTitle = document.querySelector(data.profileTitleSelector)
        this._avatar = document.querySelector(data.profileAvatarSelector)

        this.userId;
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileTitle: this._profileTitle.textContent
        }
    }

    setUserInfo({ profileName, profileTitle }) {
        this._profileName.textContent = profileName
        this._profileTitle.textContent = profileTitle
    }


    getUserAvatar() {
        return {
            profileName: this._profileName.textContent,
            profileTitle: this._profileTitle.textContent
        }
    }

    setUserAvatar(avatar) {

        this._avatar.src = avatar
    }

}