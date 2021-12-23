
const overlayList = document.querySelectorAll(".overlay")
const overlayListButtonClose = document.querySelectorAll(".overlay__btn-close")
const keys = { Escape: 27 }



init()
function init() {
  setEventListeners()
}


function setEventListeners() {
  overlayList.forEach(elm => elm.addEventListener("click", handleClickOverlay))
  overlayListButtonClose.forEach(elm => elm.addEventListener("click", closePopup))
}

// Overlay
function handleClickOverlay(evt) {
  const elm = evt.target
  //Make sure the parent("overlay") element is clicked
  if (elm.classList.contains("overlay_visible")) {
    closePopup()
  }
}

function handleKeyUp(evt) {
  switch (evt.keyCode) {
    case keys.Escape:
      closePopup()
      break;
  }

}

//exported function
export function openPopup(popup) {
  popup.classList.add("overlay_visible")
  document.addEventListener("keyup", handleKeyUp);
}

export function closePopup() {
  const overlayVisible = document.querySelector(".overlay_visible")
  if (overlayVisible !== null) {
    overlayVisible.classList.remove("overlay_visible")
    document.removeEventListener("keyup", handleKeyUp);
  }

}
