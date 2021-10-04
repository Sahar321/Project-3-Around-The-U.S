/// Variables
// - Profile
const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')
// - Form Profile
const frmProfile = document.querySelector("#frmProfile")
const frmProfileClose = document.querySelector('.form-profile__btn-close')
const frmProfileName = document.querySelector("#frmProfileName")
const frmProfileTitle = document.querySelector("#frmProfileTitle")
const frmProfileOverlay = document.querySelector('#frmProfileOverlay')


/// Event handlers

// - Profile handlers
function profileEditHandler() {
    frmProfileOverlay.classList.add("overlay_visible")
    frmProfileName.setAttribute("value", profileName.textContent)
    frmProfileTitle.setAttribute("value", profileTitle.textContent)
}

// - From-Profile handlers
function frmProfileCloseHandler() {
    frmProfileOverlay.classList.remove("overlay_visible")
}

function frmProfileSubmitHandler(e) {
    e.preventDefault();
    profileName.textContent = frmProfileName.value
    profileTitle.textContent = frmProfileTitle.value
    frmProfileCloseHandler()
}

/// Event Listeners

// - Profile Events
profileEdit.addEventListener("click", profileEditHandler);

// - Form Profile Events
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
