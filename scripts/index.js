import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopUp, closePopUp } from './utils.js';

const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

// Popups
const popUpProfile = document.querySelector(".popup");
const popUpAddCard = document.querySelector(".popup-add-card");
const popUpImage = document.querySelector(".big-image");

// Botones
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__button");
const btnCloseProfile = popUpProfile.querySelector(".popup__close");
const btnCloseAddCard = popUpAddCard.querySelector(".popup__close-add-card");
const btnCloseImage = popUpImage.querySelector(".big-image__close");

// Forms
const formProfile = popUpProfile.querySelector(".popup__form");
const inputName = formProfile.querySelector(".popup__name-input");
const inputDescription = formProfile.querySelector(".popup__description-input");

const formAddCard = popUpAddCard.querySelector(".popup__form");
const inputTitle = formAddCard.querySelector(".popup__name-input");
const inputLink = formAddCard.querySelector(".popup__description-input");

// Perfil
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Contenedor de tarjetas
const cardContainer = document.querySelector(".post__cards");

// Elementos del popup de imagen
const bigImage = popUpImage.querySelector(".big-image__image");
const bigImageText = popUpImage.querySelector(".big-image__text");


// Funciones
function createCard(item) {
    const card = new Card(item, "#cards", handleImageClick);
    return card.generateCard();
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopUp(popUpProfile);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const newCardData = {
        name: inputTitle.value,
        link: inputLink.value
    };
    const cardElement = createCard(newCardData);
    cardContainer.prepend(cardElement);
    closePopUp(popUpAddCard);
    formAddCard.reset();
}

function handleImageClick(name, link) {
    bigImage.src = link;
    bigImage.alt = name;
    bigImageText.textContent = name;
    openPopUp(popUpImage);
}


// Event Listeners
btnEditProfile.addEventListener("click", () => {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopUp(popUpProfile);
});
btnAddCard.addEventListener("click", () => openPopUp(popUpAddCard));

btnCloseProfile.addEventListener("click", () => closePopUp(popUpProfile));
btnCloseAddCard.addEventListener("click", () => closePopUp(popUpAddCard));
btnCloseImage.addEventListener("click", () => closePopUp(popUpImage));

formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

[popUpProfile, popUpAddCard, popUpImage].forEach(popup => {
    popup.addEventListener('mousedown', (e) => {
        if (e.target === popup) {
            closePopUp(popup);
        }
    });
});

// Cargar tarjetas iniciales
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardContainer.append(cardElement);
});

// validación de forms
const profileFormValidator = new FormValidator(validationConfig, formProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
addCardFormValidator.enableValidation();