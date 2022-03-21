export default class UserInfo {
    constructor({ profileNameSelector, profileTitleSelector }) {
        this._profileName = document.querySelector(profileNameSelector)
        this._profileTitle = document.querySelector(profileTitleSelector)
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
}