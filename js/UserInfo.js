export default class UserInfo {
    constructor({ profileName, profileTitle }) {


        this._profileName = document.querySelector(profileName)
        this._profileTitle = document.querySelector(profileTitle)


    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileTitle: this._profileTitle.textContent
        }
    }

    setUserInfo({ profileName, profileTitle }) {

        if (this._profileName.tagName.toLowerCase() === "input") {
            this._profileName.value = profileName
            this._profileTitle.value = profileTitle
        } else {

            this._profileName.textContent = profileName
            this._profileTitle.textContent = profileTitle
        }





    }
}