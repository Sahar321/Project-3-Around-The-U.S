import profile_Avater from "../img/avatars/avater-icon.png";
import header_Logo from "../img/logo/logo.svg";

export const profileAvater = document.querySelector("#ProfileAvater");
profileAvater.src = profile_Avater;

export const headerLogo = document.querySelector("#headerLogo");
headerLogo.src = header_Logo;


export const initialCards = [{
        CardTitle: "Yosemite Valley",
        CardURL: "https://code.s3.yandex.net/web-code/yosemite.jpg"

    },
    {
        CardTitle: "Lake Louise",
        CardURL: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        CardTitle: "Bald Mountains",
        CardURL: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        CardTitle: "Latemar",
        CardURL: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        CardTitle: "Vanoise National Park",
        CardURL: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        CardTitle: "Lago di Braies",
        CardURL: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];