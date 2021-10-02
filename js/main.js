// btn like
const btnLike = document.querySelectorAll('.btn-like')
btnLike.forEach((e) => {
    e.addEventListener('click', btnLikeHandler)
});
function btnLikeHandler(e) {
    e.target.classList.toggle("btn-like_state_active")
}

// I preferred to use ForEach in this case
/*
for (let i = 0; i < btnLike.length; i++) {
    btnLike[i].addEventListener('click', btnLikeHandler);
}
*/


// profile edit btn
const btnEditForm = document.querySelector('.profile__edit-info')
btnEditForm.addEventListener("click", (e) => {
    const profileForm = document.querySelector('#profileForm')

    if (!(profileForm.classList.contains("overlay_visibility_visible"))) {
        profileForm.classList.add("overlay_visibility_visible")
    }
    const profileName = document.querySelector(".profile__name")
    const profileTitle = document.querySelector(".profile__title")
    const FrmName = document.getElementById("frmProfileName")
    const frmTitle = document.getElementById("frmProfileTitle")
    FrmName.setAttribute("value", profileName.textContent)
    frmTitle.setAttribute("value", profileTitle.textContent)
});


// profile form submit
const btnSubmit = document.querySelector(".btn-submit")
btnSubmit.addEventListener("click", btnSubmitHandler)
function btnSubmitHandler(e) {
    e.preventDefault();
    const profileName = document.querySelector(".profile__name")
    const profileTitle = document.querySelector(".profile__title")
    const FrmName = document.getElementById("frmProfileName")
    const frmTitle = document.getElementById("frmProfileTitle")

    profileName.textContent = FrmName.value
    profileTitle.textContent = frmTitle.value
    const profileForm = document.querySelector('#profileForm')

    if (profileForm.classList.contains("overlay_visibility_visible")) {
        profileForm.classList.remove("overlay_visibility_visible")
    }
}


//exit btn: Hide profile form popup with overlay.
const btnCloseForm = document.querySelector('.btn-close')
btnCloseForm.addEventListener("click", (e) => {
    const overlyElm = document.querySelector('#profileForm')
    if (overlyElm.classList.contains("overlay_visibility_visible")) {
        overlyElm.classList.remove("overlay_visibility_visible")
    }
});

