import loadingBlueUrl from "../../img/loading/loadingBlue.svg";
import headerLogoURL from "../../img/logo/logo.svg";
import faviconURL from "../../img/favicon/favicon.ico"

export const indexImageUrls = {
    "loadingBlueUrl": loadingBlueUrl,
    "headerLogoURL": headerLogoURL,
    "faviconURL": faviconURL
}



// Configs
export const formConfigIndex = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-submit",
    inactiveButtonClass: "popup__btn-submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};


// index Selectors

export const indexSelectors = {
    profileInfo: {
        profileName: ".profile__name",
        profileTitle: ".profile__title",
        profileAvatar: ".profile__avatar"
    },

    profileForm: {
        form: '#formProfile',
        profileName: "#profileName",
        profileTitle: "#profileTitle",
        profileAvatarImage: "#avatarImage"
    },

    overlayImage: "#overlayImage",
    cardList: ".cards",
    cardTemplate: "#card",
    cardForm: '#formCard',

    profileAvatarForm: '#formProfileAvatar',
    popupConfirmAction: "#popupConfirmAction",
    popupWithMessage: "#popupWithMessage",
}