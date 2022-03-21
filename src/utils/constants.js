import profileAvaterURL from "../../img/avatars/avater-icon.png";
import headerLogoURL from "../../img/logo/logo.svg";
import faviconURL from "../../img/favicon/favicon.ico"

export const indexImageUrls = {
    "profileAvaterURL": profileAvaterURL,
    "headerLogoURL": headerLogoURL,
    "faviconURL": faviconURL
}





export const initialCards = [{
        cardTitle: "Yosemite Valley",
        cardURL: "https://code.s3.yandex.net/web-code/yosemite.jpg"

    },
    {
        cardTitle: "Lake Louise",
        cardURL: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        cardTitle: "Bald Mountains",
        cardURL: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        cardTitle: "Latemar",
        cardURL: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        cardTitle: "Vanoise National Park",
        cardURL: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        cardTitle: "Lago di Braies",
        cardURL: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


// Configs
export const formConfigIndex = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-submit",
    inactiveButtonClass: "popup__btn-submit_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};