/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Card.js":
/*!********************!*\
  !*** ./js/Card.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Card; }
/* harmony export */ });
class Card {
  constructor(cardData, selector, cardClick) {
    this._handleCardClick = cardClick;
    this._CardTitle = cardData.CardTitle;
    this._CardURL = cardData.CardURL;
    this._cardTemplate = document.querySelector(selector).content;
    this._handleClick = this._handleClick.bind(this);
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", this._handleLikeCard);

    this._cardDelete.addEventListener("click", this._handleDeleteCard);

    this._cardImg.addEventListener("click", this._handleClick);
  }

  _handleClick(e) {
    const data = {
      CardURL: e.target.getAttribute("src"),
      CardTitle: e.target.getAttribute("alt")
    };

    this._handleCardClick(data);
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("btn-like_state_active");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  createCard() {
    this._card = this._cardTemplate.querySelector(".card").cloneNode(true);
    this._cardName = this._card.querySelector(".card__name");
    this._cardImg = this._card.querySelector(".card__img");
    this._cardLike = this._card.querySelector(".card__like");
    this._cardDelete = this._card.querySelector(".card__delete-card");
    this._cardName.textContent = this._CardTitle;

    this._cardImg.setAttribute("src", this._CardURL);

    this._cardImg.setAttribute("alt", this._CardTitle);

    this._setEventListeners();

    return this._card;
  }

}

/***/ }),

/***/ "./js/ConfigData.js":
/*!**************************!*\
  !*** ./js/ConfigData.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formConfigIndex": function() { return /* binding */ formConfigIndex; }
/* harmony export */ });
const formConfigIndex = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

/***/ }),

/***/ "./js/FormValidator.js":
/*!*****************************!*\
  !*** ./js/FormValidator.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FormValidator; }
/* harmony export */ });
class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

    inputElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

    inputElement.classList.remove(this._config.errorClass);
    errorElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);

      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;

      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    inputElement.addEventListener("input", function () {
      this._toggleButtonState();

      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }.bind(this));
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
    });
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();

    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    }); //this._toggleButtonState()

  }

}

/***/ }),

/***/ "./js/Popup.js":
/*!*********************!*\
  !*** ./js/Popup.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this.close = this.close.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popup.classList.add("overlay_visible");
  }

  close() {
    this._popup.classList.remove("overlay_visible");

    this._popup.removeEventListener("click", this._handleClose);
  }

  _handleEscClose() {
    // arrow bind (this) ^^
    console.log("Escape EVENT FIRE");

    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleClose(e) {
    const elmClassList = e.target.classList;

    if (elmClassList.contains("overlay__btn-close") || elmClassList.contains("overlay")) {
      e.stopPropagation();
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClose);
  }

}

/***/ }),

/***/ "./js/PopupWithForm.js":
/*!*****************************!*\
  !*** ./js/PopupWithForm.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithForm; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./js/Popup.js");

class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".form");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const inputValues = {};
    const inputsList = [...this._form.querySelectorAll(".popup__input")];
    inputsList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._handleSubmit);

    super.setEventListeners();
  }

  _handleSubmit(e) {
    e.preventDefault();

    this._submitHandler(this._getInputValues());

    this.close();
  }

  close() {
    this._form.removeEventListener("submit", this._handleSubmit);

    this._form.reset();

    super.close();
  }

}

/***/ }),

/***/ "./js/PopupWithImage.js":
/*!******************************!*\
  !*** ./js/PopupWithImage.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithImage; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./js/Popup.js");

class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(selector) {
    super(selector);
    this._popupImage = document.querySelector(".overlay__img");
  }

  open(_ref) {
    let {
      CardTitle,
      CardURL
    } = _ref;

    const title = this._popup.querySelector(".overlay__text");

    this._popupImage.src = CardURL;
    title.textContent = CardTitle;
    super.open();
  }

  setEventListeners() {
    this._popupImage.addEventListener("click", this.close);

    super.setEventListeners();
  }

  close() {
    this._popupImage.removeEventListener("click", this.close);

    super.close();
  }

}

/***/ }),

/***/ "./js/Section.js":
/*!***********************!*\
  !*** ./js/Section.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Section; }
/* harmony export */ });
class Section {
  constructor(_ref, containerSelector) {
    let {
      items,
      renderer
    } = _ref;
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }

}

/***/ }),

/***/ "./js/UserInfo.js":
/*!************************!*\
  !*** ./js/UserInfo.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UserInfo; }
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      profileName,
      profileTitle
    } = _ref;
    this._profileName = document.querySelector(profileName);
    this._profileTitle = document.querySelector(profileTitle);
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileTitle: this._profileTitle.textContent
    };
  }

  setUserInfo(_ref2) {
    let {
      profileName,
      profileTitle
    } = _ref2;

    if (this._profileName.tagName.toLowerCase() === "input") {
      this._profileName.value = profileName;
      this._profileTitle.value = profileTitle;
    } else {
      this._profileName.textContent = profileName;
      this._profileTitle.textContent = profileTitle;
    }
  }

}

/***/ }),

/***/ "./js/initialData.js":
/*!***************************!*\
  !*** ./js/initialData.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "headerLogo": function() { return /* binding */ headerLogo; },
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "profileAvater": function() { return /* binding */ profileAvater; }
/* harmony export */ });
/* harmony import */ var _img_avatars_avater_icon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/avatars/avater-icon.png */ "./img/avatars/avater-icon.png");
/* harmony import */ var _img_logo_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/logo/logo.svg */ "./img/logo/logo.svg");


const profileAvater = document.querySelector("#ProfileAvater");
profileAvater.src = _img_avatars_avater_icon_png__WEBPACK_IMPORTED_MODULE_0__;
const headerLogo = document.querySelector("#headerLogo");
headerLogo.src = _img_logo_logo_svg__WEBPACK_IMPORTED_MODULE_1__;
const initialCards = [{
  CardTitle: "Yosemite Valley",
  CardURL: "https://code.s3.yandex.net/web-code/yosemite.jpg"
}, {
  CardTitle: "Lake Louise",
  CardURL: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
}, {
  CardTitle: "Bald Mountains",
  CardURL: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
}, {
  CardTitle: "Latemar",
  CardURL: "https://code.s3.yandex.net/web-code/latemar.jpg"
}, {
  CardTitle: "Vanoise National Park",
  CardURL: "https://code.s3.yandex.net/web-code/vanoise.jpg"
}, {
  CardTitle: "Lago di Braies",
  CardURL: "https://code.s3.yandex.net/web-code/lago.jpg"
}];

/***/ }),

/***/ "./pages/index.css":
/*!*************************!*\
  !*** ./pages/index.css ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./img/avatars/avater-icon.png":
/*!*************************************!*\
  !*** ./img/avatars/avater-icon.png ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "993f3d93348c99403d38.png";

/***/ }),

/***/ "./img/logo/logo.svg":
/*!***************************!*\
  !*** ./img/logo/logo.svg ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4e8e0a1d604782a0dff8.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormValidator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormValidator.js */ "./js/FormValidator.js");
/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Card.js */ "./js/Card.js");
/* harmony import */ var _initialData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initialData.js */ "./js/initialData.js");
/* harmony import */ var _ConfigData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigData.js */ "./js/ConfigData.js");
/* harmony import */ var _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopupWithForm.js */ "./js/PopupWithForm.js");
/* harmony import */ var _PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PopupWithImage.js */ "./js/PopupWithImage.js");
/* harmony import */ var _UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserInfo.js */ "./js/UserInfo.js");
/* harmony import */ var _Section_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Section.js */ "./js/Section.js");
/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/index.css */ "./pages/index.css");
/// imports








 /// -Selectors

const overlayImageSelector = "#overlayImage";
const cardListSelector = ".cards";
const cardTemplateSelector = "#card";
const cardFormSelector = '#formCard';
const profileFormSelector = '#formProfile'; /// Variables

const profileEdit = document.querySelector('.profile__edit-info');
const profileForm = document.querySelector(profileFormSelector);
const profileFormValidator = new _FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](_ConfigData_js__WEBPACK_IMPORTED_MODULE_3__.formConfigIndex, profileForm);
const profileAddCard = document.querySelector('.profile__add');
const userInfoProfile = new _UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
  profileName: ".profile__name",
  profileTitle: ".profile__title"
}); //card

const cardForm = document.querySelector(cardFormSelector);
const cardFormValidator = new _FormValidator_js__WEBPACK_IMPORTED_MODULE_0__["default"](_ConfigData_js__WEBPACK_IMPORTED_MODULE_3__.formConfigIndex, cardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation(); //Profile

function profileFormEditHandler() {
  const popupProfile = new _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__["default"](profileFormSelector, data => userInfoProfile.setUserInfo(data));
  const userInfoFormEditor = new _UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    profileName: "#profileName",
    profileTitle: "#profileTitle"
  });
  userInfoFormEditor.setUserInfo(userInfoProfile.getUserInfo());
  profileFormValidator.resetValidation();
  popupProfile.setEventListeners();
  popupProfile.open();
} // Card


const cardSection = new _Section_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  items: _initialData_js__WEBPACK_IMPORTED_MODULE_2__.initialCards,
  renderer: cardData => {
    const card = new _Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](cardData, cardTemplateSelector, imageData => {
      const pop = new _PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__["default"](overlayImageSelector);
      pop.setEventListeners();
      pop.open(imageData);
    });
    cardSection.addItem(card.createCard());
  }
}, cardListSelector);
cardSection.render();

function cardFormAddHandler() {
  const popupAddCard = new _PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__["default"](cardFormSelector, cardData => {
    const card = new _Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](cardData, cardTemplateSelector, imageData => {
      const pop = new _PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__["default"](overlayImageSelector);
      pop.setEventListeners();
      pop.open(imageData);
    });
    cardSection.addItem(card.createCard());
  });
  cardFormValidator.resetValidation();
  popupAddCard.setEventListeners();
  popupAddCard.open();
} /// Event Listeners


profileEdit.addEventListener("click", profileFormEditHandler);
profileAddCard.addEventListener("click", cardFormAddHandler);
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlLE1BQU1BLElBQU4sQ0FBVztBQUN0QkMsRUFBQUEsV0FBVyxDQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBcUJDLFNBQXJCLEVBQWdDO0FBQ3ZDLFNBQUtDLGdCQUFMLEdBQXdCRCxTQUF4QjtBQUNBLFNBQUtFLFVBQUwsR0FBa0JKLFFBQVEsQ0FBQ0ssU0FBM0I7QUFDQSxTQUFLQyxRQUFMLEdBQWdCTixRQUFRLENBQUNPLE9BQXpCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkMsUUFBUSxDQUFDQyxhQUFULENBQXVCVCxRQUF2QixFQUFpQ1UsT0FBdEQ7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBRUg7O0FBRURDLEVBQUFBLGtCQUFrQixHQUFHO0FBQ2pCLFNBQUtDLFNBQUwsQ0FBZUMsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsS0FBS0MsZUFBOUM7O0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkYsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDLEtBQUtHLGlCQUFoRDs7QUFDQSxTQUFLQyxRQUFMLENBQWNKLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLEtBQUtKLFlBQTdDO0FBQ0g7O0FBR0RBLEVBQUFBLFlBQVksQ0FBQ1MsQ0FBRCxFQUFJO0FBQ1osVUFBTUMsSUFBSSxHQUFHO0FBQ1RmLE1BQUFBLE9BQU8sRUFBRWMsQ0FBQyxDQUFDRSxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsS0FBdEIsQ0FEQTtBQUVUbkIsTUFBQUEsU0FBUyxFQUFFZ0IsQ0FBQyxDQUFDRSxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsS0FBdEI7QUFGRixLQUFiOztBQUtBLFNBQUtyQixnQkFBTCxDQUFzQm1CLElBQXRCO0FBQ0g7O0FBRURMLEVBQUFBLGVBQWUsQ0FBQ1EsR0FBRCxFQUFNO0FBQ2pCQSxJQUFBQSxHQUFHLENBQUNGLE1BQUosQ0FBV0csU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsdUJBQTVCO0FBQ0g7O0FBRURSLEVBQUFBLGlCQUFpQixDQUFDTSxHQUFELEVBQU07QUFDbkJBLElBQUFBLEdBQUcsQ0FBQ0YsTUFBSixDQUFXSyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCQyxNQUE1QjtBQUNIOztBQUdEQyxFQUFBQSxVQUFVLEdBQUc7QUFDVCxTQUFLQyxLQUFMLEdBQWEsS0FBS3ZCLGFBQUwsQ0FBbUJFLGFBQW5CLENBQWlDLE9BQWpDLEVBQTBDc0IsU0FBMUMsQ0FBb0QsSUFBcEQsQ0FBYjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS0YsS0FBTCxDQUFXckIsYUFBWCxDQUF5QixhQUF6QixDQUFqQjtBQUNBLFNBQUtVLFFBQUwsR0FBZ0IsS0FBS1csS0FBTCxDQUFXckIsYUFBWCxDQUF5QixZQUF6QixDQUFoQjtBQUNBLFNBQUtLLFNBQUwsR0FBaUIsS0FBS2dCLEtBQUwsQ0FBV3JCLGFBQVgsQ0FBeUIsYUFBekIsQ0FBakI7QUFDQSxTQUFLUSxXQUFMLEdBQW1CLEtBQUthLEtBQUwsQ0FBV3JCLGFBQVgsQ0FBeUIsb0JBQXpCLENBQW5CO0FBQ0EsU0FBS3VCLFNBQUwsQ0FBZUMsV0FBZixHQUE2QixLQUFLOUIsVUFBbEM7O0FBQ0EsU0FBS2dCLFFBQUwsQ0FBY2UsWUFBZCxDQUEyQixLQUEzQixFQUFrQyxLQUFLN0IsUUFBdkM7O0FBQ0EsU0FBS2MsUUFBTCxDQUFjZSxZQUFkLENBQTJCLEtBQTNCLEVBQWtDLEtBQUsvQixVQUF2Qzs7QUFDQSxTQUFLVSxrQkFBTDs7QUFDQSxXQUFPLEtBQUtpQixLQUFaO0FBQ0g7O0FBOUNxQjs7Ozs7Ozs7Ozs7Ozs7QUNBbkIsTUFBTUssZUFBZSxHQUFHO0FBQzNCQyxFQUFBQSxhQUFhLEVBQUUsZUFEWTtBQUUzQkMsRUFBQUEsb0JBQW9CLEVBQUUsb0JBRks7QUFHM0JDLEVBQUFBLG1CQUFtQixFQUFFLDRCQUhNO0FBSTNCQyxFQUFBQSxlQUFlLEVBQUUseUJBSlU7QUFLM0JDLEVBQUFBLFVBQVUsRUFBRTtBQUxlLENBQXhCOzs7Ozs7Ozs7Ozs7OztBQ0FRLE1BQU1DLGFBQU4sQ0FBb0I7QUFDL0IzQyxFQUFBQSxXQUFXLENBQUM0QyxNQUFELEVBQVNDLFdBQVQsRUFBc0I7QUFDN0IsU0FBS0MsWUFBTCxHQUFvQkQsV0FBcEI7QUFDQSxTQUFLRSxPQUFMLEdBQWVILE1BQWY7QUFDSDs7QUFFREksRUFBQUEsZUFBZSxDQUFDQyxZQUFELEVBQWVDLFlBQWYsRUFBNkI7QUFDeEMsVUFBTUMsWUFBWSxHQUFHLEtBQUtMLFlBQUwsQ0FBa0JuQyxhQUFsQixZQUFvQ3NDLFlBQVksQ0FBQ0csRUFBakQsWUFBckI7O0FBQ0FILElBQUFBLFlBQVksQ0FBQ3RCLFNBQWIsQ0FBdUIwQixHQUF2QixDQUEyQixLQUFLTixPQUFMLENBQWFMLFVBQXhDO0FBQ0FTLElBQUFBLFlBQVksQ0FBQ2hCLFdBQWIsR0FBMkJlLFlBQTNCO0FBQ0FDLElBQUFBLFlBQVksQ0FBQ3hCLFNBQWIsQ0FBdUIwQixHQUF2QixDQUEyQixLQUFLTixPQUFMLENBQWFOLGVBQXhDO0FBQ0g7O0FBRURhLEVBQUFBLGVBQWUsQ0FBQ0wsWUFBRCxFQUFlO0FBQzFCLFVBQU1FLFlBQVksR0FBRyxLQUFLTCxZQUFMLENBQWtCbkMsYUFBbEIsWUFBb0NzQyxZQUFZLENBQUNHLEVBQWpELFlBQXJCOztBQUNBSCxJQUFBQSxZQUFZLENBQUN0QixTQUFiLENBQXVCRyxNQUF2QixDQUE4QixLQUFLaUIsT0FBTCxDQUFhTCxVQUEzQztBQUNBUyxJQUFBQSxZQUFZLENBQUN4QixTQUFiLENBQXVCRyxNQUF2QixDQUE4QixLQUFLaUIsT0FBTCxDQUFhTixlQUEzQztBQUNBVSxJQUFBQSxZQUFZLENBQUNoQixXQUFiLEdBQTJCLEVBQTNCO0FBQ0g7O0FBSURvQixFQUFBQSxnQkFBZ0IsR0FBRztBQUNmLFdBQU8sS0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBc0JSLFlBQUQsSUFBa0I7QUFDMUMsYUFBTyxDQUFDQSxZQUFZLENBQUNTLFFBQWIsQ0FBc0JDLEtBQTlCO0FBQ0gsS0FGTSxDQUFQO0FBR0g7O0FBRURDLEVBQUFBLGtCQUFrQixHQUFHO0FBQ2pCLFFBQUksS0FBS0wsZ0JBQUwsRUFBSixFQUE2QjtBQUN6QixXQUFLTSxjQUFMLENBQW9CbEMsU0FBcEIsQ0FBOEIwQixHQUE5QixDQUFrQyxLQUFLTixPQUFMLENBQWFQLG1CQUEvQzs7QUFDQSxXQUFLcUIsY0FBTCxDQUFvQkMsUUFBcEIsR0FBK0IsSUFBL0I7QUFDSCxLQUhELE1BR087QUFDSCxXQUFLRCxjQUFMLENBQW9CQyxRQUFwQixHQUErQixLQUEvQjs7QUFDQSxXQUFLRCxjQUFMLENBQW9CbEMsU0FBcEIsQ0FBOEJHLE1BQTlCLENBQXFDLEtBQUtpQixPQUFMLENBQWFQLG1CQUFsRDtBQUNIO0FBQ0o7O0FBQ0R1QixFQUFBQSxtQkFBbUIsQ0FBQ2QsWUFBRCxFQUFlO0FBQzlCQSxJQUFBQSxZQUFZLENBQUNoQyxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFXO0FBQzlDLFdBQUsyQyxrQkFBTDs7QUFDQSxVQUFJLENBQUNYLFlBQVksQ0FBQ1MsUUFBYixDQUFzQkMsS0FBM0IsRUFBa0M7QUFDOUIsYUFBS1gsZUFBTCxDQUFxQkMsWUFBckIsRUFBbUNBLFlBQVksQ0FBQ2UsaUJBQWhEO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS1YsZUFBTCxDQUFxQkwsWUFBckI7QUFFSDtBQUNKLEtBUnNDLENBUXJDbkMsSUFScUMsQ0FRaEMsSUFSZ0MsQ0FBdkM7QUFTSDs7QUFJREMsRUFBQUEsa0JBQWtCLEdBQUc7QUFDakIsU0FBS3lDLFVBQUwsR0FBa0JTLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtwQixZQUFMLENBQWtCcUIsZ0JBQWxCLENBQW1DLEtBQUtwQixPQUFMLENBQWFULGFBQWhELENBQVgsQ0FBbEI7QUFDQSxTQUFLdUIsY0FBTCxHQUFzQixLQUFLZixZQUFMLENBQWtCbkMsYUFBbEIsQ0FBZ0MsS0FBS29DLE9BQUwsQ0FBYVIsb0JBQTdDLENBQXRCOztBQUNBLFNBQUtpQixVQUFMLENBQWdCWSxPQUFoQixDQUF5Qm5CLFlBQUQsSUFBa0I7QUFDdEMsV0FBS2MsbUJBQUwsQ0FBeUJkLFlBQXpCO0FBQ0gsS0FGRDtBQUdIOztBQUVEb0IsRUFBQUEsZUFBZSxHQUFHO0FBQ2QsU0FBS1Qsa0JBQUw7O0FBQ0EsU0FBS0osVUFBTCxDQUFnQlksT0FBaEIsQ0FBeUJuQixZQUFELElBQWtCO0FBQ3RDLFdBQUtLLGVBQUwsQ0FBcUJMLFlBQXJCO0FBQ0gsS0FGRDtBQUdIOztBQUVEcUIsRUFBQUEsZ0JBQWdCLEdBQUc7QUFDZixTQUFLdkQsa0JBQUw7O0FBQ0EsU0FBSytCLFlBQUwsQ0FBa0I3QixnQkFBbEIsQ0FBbUMsUUFBbkMsRUFBNkMsVUFBU1MsR0FBVCxFQUFjO0FBQ3ZEQSxNQUFBQSxHQUFHLENBQUM2QyxjQUFKO0FBQ0gsS0FGRCxFQUZlLENBTWY7O0FBQ0g7O0FBekU4Qjs7Ozs7Ozs7Ozs7Ozs7QUNBcEIsTUFBTUMsS0FBTixDQUFZO0FBQ3ZCeEUsRUFBQUEsV0FBVyxDQUFDRSxRQUFELEVBQVc7QUFDbEIsU0FBS3VFLE1BQUwsR0FBYy9ELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QlQsUUFBdkIsQ0FBZDtBQUNBLFNBQUt3RSxLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXNUQsSUFBWCxDQUFnQixJQUFoQixDQUFiO0FBQ0EsU0FBSzZELFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQjdELElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBQ0g7O0FBRUQ4RCxFQUFBQSxJQUFJLEdBQUc7QUFDSCxTQUFLSCxNQUFMLENBQVk5QyxTQUFaLENBQXNCMEIsR0FBdEIsQ0FBMEIsaUJBQTFCO0FBQ0g7O0FBR0RxQixFQUFBQSxLQUFLLEdBQUc7QUFDSixTQUFLRCxNQUFMLENBQVk5QyxTQUFaLENBQXNCRyxNQUF0QixDQUE2QixpQkFBN0I7O0FBQ0EsU0FBSzJDLE1BQUwsQ0FBWUksbUJBQVosQ0FBZ0MsT0FBaEMsRUFBeUMsS0FBS0YsWUFBOUM7QUFDSDs7QUFHREcsRUFBQUEsZUFBZSxHQUFHO0FBQUU7QUFDaEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaOztBQUNBLFFBQUkxRCxDQUFDLENBQUMyRCxHQUFGLEtBQVUsUUFBZCxFQUF3QjtBQUNwQixXQUFLUCxLQUFMO0FBQ0g7QUFDSjs7QUFFREMsRUFBQUEsWUFBWSxDQUFDckQsQ0FBRCxFQUFJO0FBQ1osVUFBTTRELFlBQVksR0FBRzVELENBQUMsQ0FBQ0UsTUFBRixDQUFTRyxTQUE5Qjs7QUFDQSxRQUFJdUQsWUFBWSxDQUFDQyxRQUFiLENBQXNCLG9CQUF0QixLQUErQ0QsWUFBWSxDQUFDQyxRQUFiLENBQXNCLFNBQXRCLENBQW5ELEVBQXFGO0FBQ2pGN0QsTUFBQUEsQ0FBQyxDQUFDOEQsZUFBRjtBQUNBLFdBQUtWLEtBQUw7QUFDSDtBQUNKOztBQUNEVyxFQUFBQSxpQkFBaUIsR0FBRztBQUNoQixTQUFLWixNQUFMLENBQVl4RCxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxLQUFLMEQsWUFBM0M7QUFDSDs7QUFsQ3NCOzs7Ozs7Ozs7Ozs7Ozs7QUNBM0I7QUFFZSxNQUFNVyxhQUFOLFNBQTRCZCxpREFBNUIsQ0FBa0M7QUFDN0N4RSxFQUFBQSxXQUFXLENBQUN1RixhQUFELEVBQWdCQyxhQUFoQixFQUErQjtBQUN0QyxVQUFNRCxhQUFOO0FBQ0EsU0FBS0UsY0FBTCxHQUFzQkQsYUFBdEI7QUFDQSxTQUFLRSxLQUFMLEdBQWEsS0FBS2pCLE1BQUwsQ0FBWTlELGFBQVosQ0FBMEIsT0FBMUIsQ0FBYjtBQUNBLFNBQUtnRixhQUFMLEdBQXFCLEtBQUtBLGFBQUwsQ0FBbUI3RSxJQUFuQixDQUF3QixJQUF4QixDQUFyQjtBQUVIOztBQUVEOEUsRUFBQUEsZUFBZSxHQUFHO0FBQ2QsVUFBTUMsV0FBVyxHQUFHLEVBQXBCO0FBQ0EsVUFBTUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFLSixLQUFMLENBQVd2QixnQkFBWCxDQUE0QixlQUE1QixDQUFKLENBQW5CO0FBQ0EyQixJQUFBQSxVQUFVLENBQUMxQixPQUFYLENBQW1CMkIsS0FBSyxJQUFJRixXQUFXLENBQUNFLEtBQUssQ0FBQ0MsSUFBUCxDQUFYLEdBQTBCRCxLQUFLLENBQUNFLEtBQTVEO0FBQ0EsV0FBT0osV0FBUDtBQUNIOztBQUlEUixFQUFBQSxpQkFBaUIsR0FBRztBQUNoQixTQUFLSyxLQUFMLENBQVd6RSxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxLQUFLMEUsYUFBM0M7O0FBQ0EsVUFBTU4saUJBQU47QUFDSDs7QUFFRE0sRUFBQUEsYUFBYSxDQUFDckUsQ0FBRCxFQUFJO0FBQ2JBLElBQUFBLENBQUMsQ0FBQ2lELGNBQUY7O0FBQ0EsU0FBS2tCLGNBQUwsQ0FBb0IsS0FBS0csZUFBTCxFQUFwQjs7QUFDQSxTQUFLbEIsS0FBTDtBQUNIOztBQUNEQSxFQUFBQSxLQUFLLEdBQUc7QUFDSixTQUFLZ0IsS0FBTCxDQUFXYixtQkFBWCxDQUErQixRQUEvQixFQUF5QyxLQUFLYyxhQUE5Qzs7QUFDQSxTQUFLRCxLQUFMLENBQVdRLEtBQVg7O0FBRUEsVUFBTXhCLEtBQU47QUFDSDs7QUFqQzRDOzs7Ozs7Ozs7Ozs7Ozs7QUNGakQ7QUFHZSxNQUFNeUIsY0FBTixTQUE2QjNCLGlEQUE3QixDQUFtQztBQUM5Q3hFLEVBQUFBLFdBQVcsQ0FBQ0UsUUFBRCxFQUFXO0FBQ2xCLFVBQU1BLFFBQU47QUFDQSxTQUFLa0csV0FBTCxHQUFtQjFGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixDQUFuQjtBQUNIOztBQUVEaUUsRUFBQUEsSUFBSSxPQUF5QjtBQUFBLFFBQXhCO0FBQUV0RSxNQUFBQSxTQUFGO0FBQWFFLE1BQUFBO0FBQWIsS0FBd0I7O0FBQ3pCLFVBQU02RixLQUFLLEdBQUcsS0FBSzVCLE1BQUwsQ0FBWTlELGFBQVosQ0FBMEIsZ0JBQTFCLENBQWQ7O0FBQ0EsU0FBS3lGLFdBQUwsQ0FBaUJFLEdBQWpCLEdBQXVCOUYsT0FBdkI7QUFDQTZGLElBQUFBLEtBQUssQ0FBQ2xFLFdBQU4sR0FBb0I3QixTQUFwQjtBQUNBLFVBQU1zRSxJQUFOO0FBRUg7O0FBR0RTLEVBQUFBLGlCQUFpQixHQUFHO0FBQ2hCLFNBQUtlLFdBQUwsQ0FBaUJuRixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsS0FBS3lELEtBQWhEOztBQUNBLFVBQU1XLGlCQUFOO0FBRUg7O0FBRURYLEVBQUFBLEtBQUssR0FBRztBQUNKLFNBQUswQixXQUFMLENBQWlCdkIsbUJBQWpCLENBQXFDLE9BQXJDLEVBQThDLEtBQUtILEtBQW5EOztBQUNBLFVBQU1BLEtBQU47QUFDSDs7QUF4QjZDOzs7Ozs7Ozs7Ozs7OztBQ0huQyxNQUFNNkIsT0FBTixDQUFjO0FBQ3pCdkcsRUFBQUEsV0FBVyxPQUFzQndHLGlCQUF0QixFQUF5QztBQUFBLFFBQXhDO0FBQUVDLE1BQUFBLEtBQUY7QUFBU0MsTUFBQUE7QUFBVCxLQUF3QztBQUNoRCxTQUFLQyxNQUFMLEdBQWNGLEtBQWQ7QUFDQSxTQUFLRyxTQUFMLEdBQWlCRixRQUFqQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0JuRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUI2RixpQkFBdkIsQ0FBbEI7QUFFSDs7QUFFRE0sRUFBQUEsTUFBTSxHQUFHO0FBQ0wsU0FBS0gsTUFBTCxDQUFZdkMsT0FBWixDQUFvQjJDLElBQUksSUFBSSxLQUFLSCxTQUFMLENBQWVHLElBQWYsQ0FBNUI7QUFDSDs7QUFFREMsRUFBQUEsT0FBTyxDQUFDQyxPQUFELEVBQVU7QUFDYixTQUFLSixVQUFMLENBQWdCSyxPQUFoQixDQUF3QkQsT0FBeEI7QUFDSDs7QUFkd0I7Ozs7Ozs7Ozs7Ozs7O0FDQWQsTUFBTUUsUUFBTixDQUFlO0FBQzFCbkgsRUFBQUEsV0FBVyxPQUFnQztBQUFBLFFBQS9CO0FBQUVvSCxNQUFBQSxXQUFGO0FBQWVDLE1BQUFBO0FBQWYsS0FBK0I7QUFHdkMsU0FBS0MsWUFBTCxHQUFvQjVHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QnlHLFdBQXZCLENBQXBCO0FBQ0EsU0FBS0csYUFBTCxHQUFxQjdHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QjBHLFlBQXZCLENBQXJCO0FBR0g7O0FBRURHLEVBQUFBLFdBQVcsR0FBRztBQUNWLFdBQU87QUFDSEosTUFBQUEsV0FBVyxFQUFFLEtBQUtFLFlBQUwsQ0FBa0JuRixXQUQ1QjtBQUVIa0YsTUFBQUEsWUFBWSxFQUFFLEtBQUtFLGFBQUwsQ0FBbUJwRjtBQUY5QixLQUFQO0FBSUg7O0FBRURzRixFQUFBQSxXQUFXLFFBQWdDO0FBQUEsUUFBL0I7QUFBRUwsTUFBQUEsV0FBRjtBQUFlQyxNQUFBQTtBQUFmLEtBQStCOztBQUV2QyxRQUFJLEtBQUtDLFlBQUwsQ0FBa0JJLE9BQWxCLENBQTBCQyxXQUExQixPQUE0QyxPQUFoRCxFQUF5RDtBQUNyRCxXQUFLTCxZQUFMLENBQWtCckIsS0FBbEIsR0FBMEJtQixXQUExQjtBQUNBLFdBQUtHLGFBQUwsQ0FBbUJ0QixLQUFuQixHQUEyQm9CLFlBQTNCO0FBQ0gsS0FIRCxNQUdPO0FBRUgsV0FBS0MsWUFBTCxDQUFrQm5GLFdBQWxCLEdBQWdDaUYsV0FBaEM7QUFDQSxXQUFLRyxhQUFMLENBQW1CcEYsV0FBbkIsR0FBaUNrRixZQUFqQztBQUNIO0FBTUo7O0FBaEN5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTlCO0FBQ0E7QUFFTyxNQUFNUyxhQUFhLEdBQUdwSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXRCO0FBQ1BtSCxhQUFhLENBQUN4QixHQUFkLEdBQW9Cc0IseURBQXBCO0FBRU8sTUFBTUcsVUFBVSxHQUFHckgsUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLENBQW5CO0FBQ1BvSCxVQUFVLENBQUN6QixHQUFYLEdBQWlCdUIsK0NBQWpCO0FBR08sTUFBTUcsWUFBWSxHQUFHLENBQUM7QUFDckIxSCxFQUFBQSxTQUFTLEVBQUUsaUJBRFU7QUFFckJFLEVBQUFBLE9BQU8sRUFBRTtBQUZZLENBQUQsRUFLeEI7QUFDSUYsRUFBQUEsU0FBUyxFQUFFLGFBRGY7QUFFSUUsRUFBQUEsT0FBTyxFQUFFO0FBRmIsQ0FMd0IsRUFTeEI7QUFDSUYsRUFBQUEsU0FBUyxFQUFFLGdCQURmO0FBRUlFLEVBQUFBLE9BQU8sRUFBRTtBQUZiLENBVHdCLEVBYXhCO0FBQ0lGLEVBQUFBLFNBQVMsRUFBRSxTQURmO0FBRUlFLEVBQUFBLE9BQU8sRUFBRTtBQUZiLENBYndCLEVBaUJ4QjtBQUNJRixFQUFBQSxTQUFTLEVBQUUsdUJBRGY7QUFFSUUsRUFBQUEsT0FBTyxFQUFFO0FBRmIsQ0FqQndCLEVBcUJ4QjtBQUNJRixFQUFBQSxTQUFTLEVBQUUsZ0JBRGY7QUFFSUUsRUFBQUEsT0FBTyxFQUFFO0FBRmIsQ0FyQndCLENBQXJCOzs7Ozs7Ozs7OztBQ1ZQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtDQUtBOztBQUNBLE1BQU15SCxvQkFBb0IsR0FBRyxlQUE3QjtBQUNBLE1BQU1DLGdCQUFnQixHQUFHLFFBQXpCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUcsT0FBN0I7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBRyxXQUF6QjtBQUNBLE1BQU1DLG1CQUFtQixHQUFHLGNBQTVCLEVBRUE7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHNUgsUUFBUSxDQUFDQyxhQUFULENBQXVCLHFCQUF2QixDQUFwQjtBQUNBLE1BQU00SCxXQUFXLEdBQUc3SCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIwSCxtQkFBdkIsQ0FBcEI7QUFDQSxNQUFNRyxvQkFBb0IsR0FBRyxJQUFJN0YseURBQUosQ0FBa0JOLDJEQUFsQixFQUFtQ2tHLFdBQW5DLENBQTdCO0FBQ0EsTUFBTUUsY0FBYyxHQUFHL0gsUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQXZCO0FBQ0EsTUFBTStILGVBQWUsR0FBRyxJQUFJdkIsb0RBQUosQ0FBYTtBQUNqQ0MsRUFBQUEsV0FBVyxFQUFFLGdCQURvQjtBQUVqQ0MsRUFBQUEsWUFBWSxFQUFFO0FBRm1CLENBQWIsQ0FBeEIsRUFLQTs7QUFDQSxNQUFNc0IsUUFBUSxHQUFHakksUUFBUSxDQUFDQyxhQUFULENBQXVCeUgsZ0JBQXZCLENBQWpCO0FBQ0EsTUFBTVEsaUJBQWlCLEdBQUcsSUFBSWpHLHlEQUFKLENBQWtCTiwyREFBbEIsRUFBbUNzRyxRQUFuQyxDQUExQjtBQUdBSCxvQkFBb0IsQ0FBQ2xFLGdCQUFyQjtBQUNBc0UsaUJBQWlCLENBQUN0RSxnQkFBbEIsSUFNQTs7QUFDQSxTQUFTdUUsc0JBQVQsR0FBa0M7QUFDOUIsUUFBTUMsWUFBWSxHQUFHLElBQUl4RCx5REFBSixDQUFrQitDLG1CQUFsQixFQUF1QzlHLElBQUksSUFBSW1ILGVBQWUsQ0FBQ2pCLFdBQWhCLENBQTRCbEcsSUFBNUIsQ0FBL0MsQ0FBckI7QUFDQSxRQUFNd0gsa0JBQWtCLEdBQUcsSUFBSTVCLG9EQUFKLENBQWE7QUFBRUMsSUFBQUEsV0FBVyxFQUFFLGNBQWY7QUFBK0JDLElBQUFBLFlBQVksRUFBRTtBQUE3QyxHQUFiLENBQTNCO0FBQ0EwQixFQUFBQSxrQkFBa0IsQ0FBQ3RCLFdBQW5CLENBQStCaUIsZUFBZSxDQUFDbEIsV0FBaEIsRUFBL0I7QUFDQWdCLEVBQUFBLG9CQUFvQixDQUFDbkUsZUFBckI7QUFDQXlFLEVBQUFBLFlBQVksQ0FBQ3pELGlCQUFiO0FBQ0F5RCxFQUFBQSxZQUFZLENBQUNsRSxJQUFiO0FBRUgsRUFLRDs7O0FBR0EsTUFBTW9FLFdBQVcsR0FBRyxJQUFJekMsbURBQUosQ0FBWTtBQUM1QkUsRUFBQUEsS0FBSyxFQUFFdUIseURBRHFCO0FBRTVCdEIsRUFBQUEsUUFBUSxFQUFHekcsUUFBRCxJQUFjO0FBQ3BCLFVBQU1nSixJQUFJLEdBQUcsSUFBSWxKLGdEQUFKLENBQVNFLFFBQVQsRUFBbUJrSSxvQkFBbkIsRUFBMENlLFNBQUQsSUFBZTtBQUNqRSxZQUFNQyxHQUFHLEdBQUcsSUFBSWhELDBEQUFKLENBQW1COEIsb0JBQW5CLENBQVo7QUFDQWtCLE1BQUFBLEdBQUcsQ0FBQzlELGlCQUFKO0FBQ0E4RCxNQUFBQSxHQUFHLENBQUN2RSxJQUFKLENBQVNzRSxTQUFUO0FBQ0gsS0FKWSxDQUFiO0FBS0FGLElBQUFBLFdBQVcsQ0FBQ2hDLE9BQVosQ0FBb0JpQyxJQUFJLENBQUNsSCxVQUFMLEVBQXBCO0FBRUg7QUFWMkIsQ0FBWixFQVlqQm1HLGdCQVppQixDQUFwQjtBQWFBYyxXQUFXLENBQUNsQyxNQUFaOztBQUdBLFNBQVNzQyxrQkFBVCxHQUE4QjtBQUMxQixRQUFNQyxZQUFZLEdBQUcsSUFBSS9ELHlEQUFKLENBQWtCOEMsZ0JBQWxCLEVBQXFDbkksUUFBRCxJQUFjO0FBQ25FLFVBQU1nSixJQUFJLEdBQUcsSUFBSWxKLGdEQUFKLENBQVNFLFFBQVQsRUFBbUJrSSxvQkFBbkIsRUFBMENlLFNBQUQsSUFBZTtBQUNqRSxZQUFNQyxHQUFHLEdBQUcsSUFBSWhELDBEQUFKLENBQW1COEIsb0JBQW5CLENBQVo7QUFDQWtCLE1BQUFBLEdBQUcsQ0FBQzlELGlCQUFKO0FBQ0E4RCxNQUFBQSxHQUFHLENBQUN2RSxJQUFKLENBQVNzRSxTQUFUO0FBQ0gsS0FKWSxDQUFiO0FBS0FGLElBQUFBLFdBQVcsQ0FBQ2hDLE9BQVosQ0FBb0JpQyxJQUFJLENBQUNsSCxVQUFMLEVBQXBCO0FBQ0gsR0FQb0IsQ0FBckI7QUFRQTZHLEVBQUFBLGlCQUFpQixDQUFDdkUsZUFBbEI7QUFDQWdGLEVBQUFBLFlBQVksQ0FBQ2hFLGlCQUFiO0FBQ0FnRSxFQUFBQSxZQUFZLENBQUN6RSxJQUFiO0FBQ0gsRUFFRDs7O0FBQ0EwRCxXQUFXLENBQUNySCxnQkFBWixDQUE2QixPQUE3QixFQUFzQzRILHNCQUF0QztBQUNBSixjQUFjLENBQUN4SCxnQkFBZixDQUFnQyxPQUFoQyxFQUF5Q21JLGtCQUF6QyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC04Ly4vanMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LTgvLi9qcy9Db25maWdEYXRhLmpzIiwid2VicGFjazovL3Byb2plY3QtOC8uL2pzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC04Ly4vanMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC04Ly4vanMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LTgvLi9qcy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LTgvLi9qcy9TZWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtOC8uL2pzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3Byb2plY3QtOC8uL2pzL2luaXRpYWxEYXRhLmpzIiwid2VicGFjazovL3Byb2plY3QtOC8uL3BhZ2VzL2luZGV4LmNzcz8wMjljIiwid2VicGFjazovL3Byb2plY3QtOC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LTgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtOC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtOC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtOC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9wcm9qZWN0LTgvLi9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuICAgIGNvbnN0cnVjdG9yKGNhcmREYXRhLCBzZWxlY3RvciwgY2FyZENsaWNrKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayA9IGNhcmRDbGlja1xuICAgICAgICB0aGlzLl9DYXJkVGl0bGUgPSBjYXJkRGF0YS5DYXJkVGl0bGVcbiAgICAgICAgdGhpcy5fQ2FyZFVSTCA9IGNhcmREYXRhLkNhcmRVUkxcbiAgICAgICAgdGhpcy5fY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikuY29udGVudDtcbiAgICAgICAgdGhpcy5faGFuZGxlQ2xpY2sgPSB0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMpXG5cbiAgICB9XG5cbiAgICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuX2NhcmRMaWtlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oYW5kbGVMaWtlQ2FyZClcbiAgICAgICAgdGhpcy5fY2FyZERlbGV0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlRGVsZXRlQ2FyZClcbiAgICAgICAgdGhpcy5fY2FyZEltZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlQ2xpY2spXG4gICAgfVxuXG5cbiAgICBfaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgQ2FyZFVSTDogZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwic3JjXCIpLFxuICAgICAgICAgICAgQ2FyZFRpdGxlOiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhbHRcIiksXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soZGF0YSlcbiAgICB9XG5cbiAgICBfaGFuZGxlTGlrZUNhcmQoZXZ0KSB7XG4gICAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImJ0bi1saWtlX3N0YXRlX2FjdGl2ZVwiKVxuICAgIH1cblxuICAgIF9oYW5kbGVEZWxldGVDYXJkKGV2dCkge1xuICAgICAgICBldnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2FyZFwiKS5yZW1vdmUoKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZUNhcmQoKSB7XG4gICAgICAgIHRoaXMuX2NhcmQgPSB0aGlzLl9jYXJkVGVtcGxhdGUucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGhpcy5fY2FyZE5hbWUgPSB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbmFtZVwiKVxuICAgICAgICB0aGlzLl9jYXJkSW1nID0gdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltZ1wiKVxuICAgICAgICB0aGlzLl9jYXJkTGlrZSA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlXCIpXG4gICAgICAgIHRoaXMuX2NhcmREZWxldGUgPSB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWNhcmRcIilcbiAgICAgICAgdGhpcy5fY2FyZE5hbWUudGV4dENvbnRlbnQgPSB0aGlzLl9DYXJkVGl0bGVcbiAgICAgICAgdGhpcy5fY2FyZEltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdGhpcy5fQ2FyZFVSTClcbiAgICAgICAgdGhpcy5fY2FyZEltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgdGhpcy5fQ2FyZFRpdGxlKVxuICAgICAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJkXG4gICAgfVxuXG59IiwiZXhwb3J0IGNvbnN0IGZvcm1Db25maWdJbmRleCA9IHtcbiAgICBpbnB1dFNlbGVjdG9yOiBcIi5wb3B1cF9faW5wdXRcIixcbiAgICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J0bi1zdWJtaXRcIixcbiAgICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcInBvcHVwX19idG4tc3VibWl0X2luYWN0aXZlXCIsXG4gICAgaW5wdXRFcnJvckNsYXNzOiBcInBvcHVwX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gICAgZXJyb3JDbGFzczogXCJwb3B1cF9fZXJyb3JfdmlzaWJsZVwiXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnRcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWdcclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fY29uZmlnLmVycm9yQ2xhc3MpO1xyXG4gICAgICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jb25maWcuaW5wdXRFcnJvckNsYXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jb25maWcuZXJyb3JDbGFzcyk7XHJcbiAgICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XHJcbiAgICAgICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jb25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2NvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dExpc3QgPSBBcnJheS5mcm9tKHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fY29uZmlnLmlucHV0U2VsZWN0b3IpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9jb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudClcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICByZXNldFZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKVxyXG4gICAgfTtcclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLmNsb3NlID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpXHJcbiAgICAgICAgdGhpcy5faGFuZGxlQ2xvc2UgPSB0aGlzLl9oYW5kbGVDbG9zZS5iaW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheV92aXNpYmxlXCIpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJvdmVybGF5X3Zpc2libGVcIilcclxuICAgICAgICB0aGlzLl9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlQ2xvc2UpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIF9oYW5kbGVFc2NDbG9zZSgpIHsgLy8gYXJyb3cgYmluZCAodGhpcykgXl5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVzY2FwZSBFVkVOVCBGSVJFXCIpXHJcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUNsb3NlKGUpIHtcclxuICAgICAgICBjb25zdCBlbG1DbGFzc0xpc3QgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgaWYgKGVsbUNsYXNzTGlzdC5jb250YWlucyhcIm92ZXJsYXlfX2J0bi1jbG9zZVwiKSB8fCBlbG1DbGFzc0xpc3QuY29udGFpbnMoXCJvdmVybGF5XCIpKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlQ2xvc2UpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXRIYW5kbGVyKSB7XHJcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3RvcilcclxuICAgICAgICB0aGlzLl9zdWJtaXRIYW5kbGVyID0gc3VibWl0SGFuZGxlclxyXG4gICAgICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIilcclxuICAgICAgICB0aGlzLl9oYW5kbGVTdWJtaXQgPSB0aGlzLl9oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fVxyXG4gICAgICAgIGNvbnN0IGlucHV0c0xpc3QgPSBbLi4udGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwX19pbnB1dFwiKV1cclxuICAgICAgICBpbnB1dHNMaXN0LmZvckVhY2goaW5wdXQgPT4gaW5wdXRWYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSlcclxuICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZXNcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXQpXHJcbiAgICAgICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVTdWJtaXQoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHRoaXMuX3N1Ym1pdEhhbmRsZXIodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSlcclxuICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgIH1cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuX2Zvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXQpXHJcbiAgICAgICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG5cclxuICAgICAgICBzdXBlci5jbG9zZSgpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKHNlbGVjdG9yKVxyXG4gICAgICAgIHRoaXMuX3BvcHVwSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlfX2ltZ1wiKVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oeyBDYXJkVGl0bGUsIENhcmRVUkwgfSkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5X190ZXh0XCIpXHJcbiAgICAgICAgdGhpcy5fcG9wdXBJbWFnZS5zcmMgPSBDYXJkVVJMXHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBDYXJkVGl0bGVcclxuICAgICAgICBzdXBlci5vcGVuKClcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuX3BvcHVwSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2UpXHJcbiAgICAgICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBJbWFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZSlcclxuICAgICAgICBzdXBlci5jbG9zZSgpXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fcmVuZGVyZXIoaXRlbSkpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVOYW1lLCBwcm9maWxlVGl0bGUgfSkge1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByb2ZpbGVOYW1lKVxyXG4gICAgICAgIHRoaXMuX3Byb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvZmlsZVRpdGxlKVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvZmlsZU5hbWU6IHRoaXMuX3Byb2ZpbGVOYW1lLnRleHRDb250ZW50LFxyXG4gICAgICAgICAgICBwcm9maWxlVGl0bGU6IHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRVc2VySW5mbyh7IHByb2ZpbGVOYW1lLCBwcm9maWxlVGl0bGUgfSkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcHJvZmlsZU5hbWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZU5hbWUudmFsdWUgPSBwcm9maWxlTmFtZVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9maWxlVGl0bGUudmFsdWUgPSBwcm9maWxlVGl0bGVcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSBwcm9maWxlTmFtZVxyXG4gICAgICAgICAgICB0aGlzLl9wcm9maWxlVGl0bGUudGV4dENvbnRlbnQgPSBwcm9maWxlVGl0bGVcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBwcm9maWxlX0F2YXRlciBmcm9tIFwiLi4vaW1nL2F2YXRhcnMvYXZhdGVyLWljb24ucG5nXCI7XHJcbmltcG9ydCBoZWFkZXJfTG9nbyBmcm9tIFwiLi4vaW1nL2xvZ28vbG9nby5zdmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlQXZhdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNQcm9maWxlQXZhdGVyXCIpO1xyXG5wcm9maWxlQXZhdGVyLnNyYyA9IHByb2ZpbGVfQXZhdGVyO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhlYWRlckxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlckxvZ29cIik7XHJcbmhlYWRlckxvZ28uc3JjID0gaGVhZGVyX0xvZ287XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFt7XHJcbiAgICAgICAgQ2FyZFRpdGxlOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgICAgIENhcmRVUkw6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUveW9zZW1pdGUuanBnXCJcclxuXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIENhcmRUaXRsZTogXCJMYWtlIExvdWlzZVwiLFxyXG4gICAgICAgIENhcmRVUkw6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFrZS1sb3Vpc2UuanBnXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgQ2FyZFRpdGxlOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICAgICAgQ2FyZFVSTDogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBDYXJkVGl0bGU6IFwiTGF0ZW1hclwiLFxyXG4gICAgICAgIENhcmRVUkw6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGF0ZW1hci5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBDYXJkVGl0bGU6IFwiVmFub2lzZSBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICAgICAgQ2FyZFVSTDogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS92YW5vaXNlLmpwZ1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIENhcmRUaXRsZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgICAgIENhcmRVUkw6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIlxyXG4gICAgfVxyXG5dOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7IiwiLy8vIGltcG9ydHNcclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4vRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi9DYXJkLmpzXCI7XHJcbmltcG9ydCB7IGluaXRpYWxDYXJkcywgaGVhZGVyTG9nbywgcHJvZmlsZUF2YXRlciB9IGZyb20gXCIuL2luaXRpYWxEYXRhLmpzXCJcclxuaW1wb3J0IHsgZm9ybUNvbmZpZ0luZGV4IH0gZnJvbSBcIi4vQ29uZmlnRGF0YS5qc1wiXHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi9Vc2VySW5mby5qc1wiXHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL1NlY3Rpb24uanNcIlxyXG5pbXBvcnQgJy4uL3BhZ2VzL2luZGV4LmNzcydcclxuXHJcblxyXG5cclxuLy8vIC1TZWxlY3RvcnNcclxuY29uc3Qgb3ZlcmxheUltYWdlU2VsZWN0b3IgPSBcIiNvdmVybGF5SW1hZ2VcIjtcclxuY29uc3QgY2FyZExpc3RTZWxlY3RvciA9IFwiLmNhcmRzXCJcclxuY29uc3QgY2FyZFRlbXBsYXRlU2VsZWN0b3IgPSBcIiNjYXJkXCI7XHJcbmNvbnN0IGNhcmRGb3JtU2VsZWN0b3IgPSAnI2Zvcm1DYXJkJ1xyXG5jb25zdCBwcm9maWxlRm9ybVNlbGVjdG9yID0gJyNmb3JtUHJvZmlsZSdcclxuXHJcbi8vLyBWYXJpYWJsZXNcclxuY29uc3QgcHJvZmlsZUVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1pbmZvJylcclxuY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByb2ZpbGVGb3JtU2VsZWN0b3IpXHJcbmNvbnN0IHByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoZm9ybUNvbmZpZ0luZGV4LCBwcm9maWxlRm9ybSlcclxuY29uc3QgcHJvZmlsZUFkZENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYWRkJylcclxuY29uc3QgdXNlckluZm9Qcm9maWxlID0gbmV3IFVzZXJJbmZvKHtcclxuICAgIHByb2ZpbGVOYW1lOiBcIi5wcm9maWxlX19uYW1lXCIsXHJcbiAgICBwcm9maWxlVGl0bGU6IFwiLnByb2ZpbGVfX3RpdGxlXCJcclxufSlcclxuXHJcbi8vY2FyZFxyXG5jb25zdCBjYXJkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FyZEZvcm1TZWxlY3RvcilcclxuY29uc3QgY2FyZEZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihmb3JtQ29uZmlnSW5kZXgsIGNhcmRGb3JtKVxyXG5cclxuXHJcbnByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKVxyXG5jYXJkRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKClcclxuXHJcblxyXG5cclxuXHJcblxyXG4vL1Byb2ZpbGVcclxuZnVuY3Rpb24gcHJvZmlsZUZvcm1FZGl0SGFuZGxlcigpIHtcclxuICAgIGNvbnN0IHBvcHVwUHJvZmlsZSA9IG5ldyBQb3B1cFdpdGhGb3JtKHByb2ZpbGVGb3JtU2VsZWN0b3IsIGRhdGEgPT4gdXNlckluZm9Qcm9maWxlLnNldFVzZXJJbmZvKGRhdGEpKVxyXG4gICAgY29uc3QgdXNlckluZm9Gb3JtRWRpdG9yID0gbmV3IFVzZXJJbmZvKHsgcHJvZmlsZU5hbWU6IFwiI3Byb2ZpbGVOYW1lXCIsIHByb2ZpbGVUaXRsZTogXCIjcHJvZmlsZVRpdGxlXCIgfSlcclxuICAgIHVzZXJJbmZvRm9ybUVkaXRvci5zZXRVc2VySW5mbyh1c2VySW5mb1Byb2ZpbGUuZ2V0VXNlckluZm8oKSlcclxuICAgIHByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0VmFsaWRhdGlvbigpXHJcbiAgICBwb3B1cFByb2ZpbGUuc2V0RXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgcG9wdXBQcm9maWxlLm9wZW4oKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vIENhcmRcclxuXHJcblxyXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKHtcclxuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXHJcbiAgICByZW5kZXJlcjogKGNhcmREYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGNhcmREYXRhLCBjYXJkVGVtcGxhdGVTZWxlY3RvciwgKGltYWdlRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb3AgPSBuZXcgUG9wdXBXaXRoSW1hZ2Uob3ZlcmxheUltYWdlU2VsZWN0b3IpXHJcbiAgICAgICAgICAgIHBvcC5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICBwb3Aub3BlbihpbWFnZURhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmQuY3JlYXRlQ2FyZCgpKTtcclxuXHJcbiAgICB9XHJcblxyXG59LCBjYXJkTGlzdFNlbGVjdG9yKVxyXG5jYXJkU2VjdGlvbi5yZW5kZXIoKTtcclxuXHJcblxyXG5mdW5jdGlvbiBjYXJkRm9ybUFkZEhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCBwb3B1cEFkZENhcmQgPSBuZXcgUG9wdXBXaXRoRm9ybShjYXJkRm9ybVNlbGVjdG9yLCAoY2FyZERhdGEpID0+IHtcclxuICAgICAgICBjb25zdCBjYXJkID0gbmV3IENhcmQoY2FyZERhdGEsIGNhcmRUZW1wbGF0ZVNlbGVjdG9yLCAoaW1hZ2VEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcCA9IG5ldyBQb3B1cFdpdGhJbWFnZShvdmVybGF5SW1hZ2VTZWxlY3RvcilcclxuICAgICAgICAgICAgcG9wLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIHBvcC5vcGVuKGltYWdlRGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZC5jcmVhdGVDYXJkKCkpXHJcbiAgICB9KVxyXG4gICAgY2FyZEZvcm1WYWxpZGF0b3IucmVzZXRWYWxpZGF0aW9uKClcclxuICAgIHBvcHVwQWRkQ2FyZC5zZXRFdmVudExpc3RlbmVycygpXHJcbiAgICBwb3B1cEFkZENhcmQub3BlbigpXHJcbn1cclxuXHJcbi8vLyBFdmVudCBMaXN0ZW5lcnNcclxucHJvZmlsZUVkaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2ZpbGVGb3JtRWRpdEhhbmRsZXIpO1xyXG5wcm9maWxlQWRkQ2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FyZEZvcm1BZGRIYW5kbGVyKSJdLCJuYW1lcyI6WyJDYXJkIiwiY29uc3RydWN0b3IiLCJjYXJkRGF0YSIsInNlbGVjdG9yIiwiY2FyZENsaWNrIiwiX2hhbmRsZUNhcmRDbGljayIsIl9DYXJkVGl0bGUiLCJDYXJkVGl0bGUiLCJfQ2FyZFVSTCIsIkNhcmRVUkwiLCJfY2FyZFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIl9oYW5kbGVDbGljayIsImJpbmQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJfY2FyZExpa2UiLCJhZGRFdmVudExpc3RlbmVyIiwiX2hhbmRsZUxpa2VDYXJkIiwiX2NhcmREZWxldGUiLCJfaGFuZGxlRGVsZXRlQ2FyZCIsIl9jYXJkSW1nIiwiZSIsImRhdGEiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJldnQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjbG9zZXN0IiwicmVtb3ZlIiwiY3JlYXRlQ2FyZCIsIl9jYXJkIiwiY2xvbmVOb2RlIiwiX2NhcmROYW1lIiwidGV4dENvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJmb3JtQ29uZmlnSW5kZXgiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIkZvcm1WYWxpZGF0b3IiLCJjb25maWciLCJmb3JtRWxlbWVudCIsIl9mb3JtRWxlbWVudCIsIl9jb25maWciLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJpZCIsImFkZCIsIl9oaWRlSW5wdXRFcnJvciIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfaW5wdXRMaXN0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfYnV0dG9uRWxlbWVudCIsImRpc2FibGVkIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkYXRpb25NZXNzYWdlIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJyZXNldFZhbGlkYXRpb24iLCJlbmFibGVWYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJQb3B1cCIsIl9wb3B1cCIsImNsb3NlIiwiX2hhbmRsZUNsb3NlIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlRXNjQ2xvc2UiLCJjb25zb2xlIiwibG9nIiwia2V5IiwiZWxtQ2xhc3NMaXN0IiwiY29udGFpbnMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZXRFdmVudExpc3RlbmVycyIsIlBvcHVwV2l0aEZvcm0iLCJwb3B1cFNlbGVjdG9yIiwic3VibWl0SGFuZGxlciIsIl9zdWJtaXRIYW5kbGVyIiwiX2Zvcm0iLCJfaGFuZGxlU3VibWl0IiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRWYWx1ZXMiLCJpbnB1dHNMaXN0IiwiaW5wdXQiLCJuYW1lIiwidmFsdWUiLCJyZXNldCIsIlBvcHVwV2l0aEltYWdlIiwiX3BvcHVwSW1hZ2UiLCJ0aXRsZSIsInNyYyIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVyIiwiaXRlbSIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwicHJvZmlsZU5hbWUiLCJwcm9maWxlVGl0bGUiLCJfcHJvZmlsZU5hbWUiLCJfcHJvZmlsZVRpdGxlIiwiZ2V0VXNlckluZm8iLCJzZXRVc2VySW5mbyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInByb2ZpbGVfQXZhdGVyIiwiaGVhZGVyX0xvZ28iLCJwcm9maWxlQXZhdGVyIiwiaGVhZGVyTG9nbyIsImluaXRpYWxDYXJkcyIsIm92ZXJsYXlJbWFnZVNlbGVjdG9yIiwiY2FyZExpc3RTZWxlY3RvciIsImNhcmRUZW1wbGF0ZVNlbGVjdG9yIiwiY2FyZEZvcm1TZWxlY3RvciIsInByb2ZpbGVGb3JtU2VsZWN0b3IiLCJwcm9maWxlRWRpdCIsInByb2ZpbGVGb3JtIiwicHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJwcm9maWxlQWRkQ2FyZCIsInVzZXJJbmZvUHJvZmlsZSIsImNhcmRGb3JtIiwiY2FyZEZvcm1WYWxpZGF0b3IiLCJwcm9maWxlRm9ybUVkaXRIYW5kbGVyIiwicG9wdXBQcm9maWxlIiwidXNlckluZm9Gb3JtRWRpdG9yIiwiY2FyZFNlY3Rpb24iLCJjYXJkIiwiaW1hZ2VEYXRhIiwicG9wIiwiY2FyZEZvcm1BZGRIYW5kbGVyIiwicG9wdXBBZGRDYXJkIl0sInNvdXJjZVJvb3QiOiIifQ==