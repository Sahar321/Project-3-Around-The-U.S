/// Variables

const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')

const frmProfile = document.querySelector(".form-profile")
const frmProfileName = document.querySelector("#frmProfileName")
const frmProfileTitle = document.querySelector("#frmProfileTitle")
const frmProfileOverlay = document.querySelector('#frmProfileOverlay')
const frmProfileClose = document.querySelector('.popup-form__btn-close')


/// Event handlers
function profileEditHandler() {
    frmProfileName.value = profileName.textContent
    frmProfileTitle.value = profileTitle.textContent
    frmProfileOverlay.classList.add("overlay_visible")
}
function frmProfileCloseHandler() {
    frmProfileOverlay.classList.remove("overlay_visible");
}

function frmProfileSubmitHandler(e) {
    e.preventDefault();
    profileName.textContent = frmProfileName.value
    profileTitle.textContent = frmProfileTitle.value
    frmProfileCloseHandler()
}

/// Event Listeners

profileEdit.addEventListener("click", profileEditHandler);
frmProfileClose.addEventListener("click", frmProfileCloseHandler);
frmProfile.addEventListener("submit", frmProfileSubmitHandler);


/* for sprint 5
card__button-like
const btnCardLike = document.querySelectorAll('.card__like')
btnCardLike.forEach((e) => {
    e.addEventListener('click', btnCardLikeHandler)
});

function btnCardLikeHandler(e) {
    e.target.classList.toggle("btn-like_state_active")
}
*/
