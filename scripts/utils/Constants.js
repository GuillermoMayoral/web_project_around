// Arreglo de tarjetas iniciales
export const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Configuración de validación
export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

// Selectores
export const profilePopupSelector = ".popup";
export const addCardPopupSelector = ".popup-add-card";
export const confirmPopupDelete = ".popup-confirm-delete";
export const imagePopupSelector = ".big-image";
export const cardContainerSelector = ".post__cards";
export const cardTemplateSelector = "#cards";
export const profileNameSelector = ".profile__name";
export const profileJobSelector = ".profile__description";
export const avatarPopup = ".popup-avatar"

// Elementos
export const btnEditProfile = document.querySelector(".profile__edit-button");
export const btnAddCard = document.querySelector(".profile__button");

// Formularios
export const formProfile = document.querySelector(profilePopupSelector).querySelector(".popup__form");
export const formAddCard = document.querySelector(addCardPopupSelector).querySelector(".popup__form");
export const formAvatar = document.querySelector(avatarPopup).querySelector(".popup__form");

// Inputs del formulario de perfil (para leer datos al abrir)
export const inputName = formProfile.querySelector(".popup__name-input");
export const inputDescription = formProfile.querySelector(".popup__description-input");

// Editar perfil
export const editProfile = document.querySelector(".profile__photo-container");
export const editProfileImage = document.querySelector(".profile__photo");


