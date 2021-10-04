
//#region buttons
/// buttons ///

// card__button-like
// I preferred to use ForEach(with arow function) in this case, insted
/* for (let i = 0; i < btnLike.length; i++) {btnLike[i].addEventListener('click', btnLikeHandler);}*/

const btnLike = document.querySelectorAll('.btn-like')
btnLike.forEach((e) => {
    e.addEventListener('click', btnLikeHandler)
});
function btnLikeHandler(e) {
    e.target.classList.toggle("btn-like_state_active")
}


//form-profile__exit-button: Hide popup-profile 
const btnCloseForm = document.querySelector('.form-profile__btn-close')
btnCloseForm.addEventListener("click", () => {
    const overly = document.querySelector('#frmProfilePopup')
    if (overly.classList.contains("overlay_visible")) {
        overly.classList.remove("overlay_visible")
    }
});

// button: profile edit info
const btnEditProfile = document.querySelector('.profile__edit-info')
btnEditProfile.addEventListener("click", profileEditHandler);



function profileEditHandler() {
    const profileForm = document.querySelector('#frmProfilePopup')
    //
    if (!(profileForm.classList.contains("overlay_visible"))) {
        profileForm.classList.add("overlay_visible")
    }
    const profileName = document.querySelector(".profile__name")
    const profileTitle = document.querySelector(".profile__title")
    const FrmName = document.querySelector("#frmProfileName")
    const frmTitle = document.querySelector("frmProfileTitle")
    FrmName.setAttribute("value", profileName.textContent)
    frmTitle.setAttribute("value", profileTitle.textContent)
}



// profile__form-submit
const btnfrmSubmit = document.querySelector(".form-profile__btn-submit")
btnfrmSubmit.addEventListener("click", FrmProfileSubmitHandler);
function FrmProfileSubmitHandler(e) {
    e.preventDefault();
    const lblProfileName = document.querySelector(".profile__name")
    const lblProfileTitle = document.querySelector(".profile__title")
//profileName profiletTitle frmProfileName
    const txbFrmName = document.querySelector("#frmProfileName")
    const txbFrmTitle = document.querySelector(".frmProfileTitle")

    lblProfileName.textContent = txbFrmName.value
    lblProfileTitle.textContent = txbFrmTitle.value
    const profileForm = document.querySelector('#frmProfilePopup')

    if (profileForm.classList.contains("overlay_visible")) {
        profileForm.classList.remove("overlay_visible")
    }
}



//#endregion
