// Clases
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import PopupWithConfirmation from './components/PopupWithConfirmation.js';

// Constantes
import {
    initialCards,
    validationConfig,
    profilePopupSelector,
    confirmPopupDelete,
    addCardPopupSelector,
    imagePopupSelector,
    cardContainerSelector,
    cardTemplateSelector,
    profileNameSelector,
    profileJobSelector,
    btnEditProfile,
    btnAddCard,
    formProfile,
    formAddCard,
    inputName,
    inputDescription
} from './utils/Constants.js';

// 1. UserInfo
const userInfo = new UserInfo({
    nameSelector: profileNameSelector,
    jobSelector: profileJobSelector
});


// 2. Popup de Imagen
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

// 3. Creación de Tarjeta
function createCard(item) {
    const card = new Card(item, cardTemplateSelector, handleCardClick, (cardID) => {
        confirmPopup.setSubmitAction(() => {
            api.deleteCard(cardID)
                .then(() => {
                    card.delete();
                    confirmPopup.close();
                })
                .catch((err) => console.log(err))
        })
        confirmPopup.open();
    });
    return card.generateCard();
}

// 4.1. Sección de insertado de Tarjetas (solo creamos variable)
let cardList

// 5. Popup de Añadir Tarjeta

const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
    addCardPopup.renderLoading(true);
    api.addCard(formData.name, formData.link)
        .then((newCardData) => {
            const cardElement = createCard(newCardData);
            cardList.addItem(cardElement);
            addCardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            addCardPopup.renderLoading(false);
        })
});
addCardPopup.setEventListeners();

// 6. Popup de Editar Perfil
const profilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
    //Actualizar perfil
    profilePopup.renderLoading(true);
    api.setUserInfo(formData.name, formData.about)
        .then(() => {
            userInfo.setUserInfo(formData.name, formData.about);
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            profilePopup.renderLoading(false);
        })
});
profilePopup.setEventListeners();

// 7. Confirmar borrar card
const confirmPopup = new PopupWithConfirmation(confirmPopupDelete);
confirmPopup.setEventListeners();

// Validación
const profileFormValidator = new FormValidator(validationConfig, formProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
addCardFormValidator.enableValidation();

// Event Listeners para Abrir Popups

btnEditProfile.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    inputName.value = currentUserInfo.name;
    inputDescription.value = currentUserInfo.job;

    profileFormValidator.resetValidation();
    profilePopup.open();
});

btnAddCard.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
});

//Llamado Api

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "efbf67fe-dc9f-462d-bc39-2cbd2043b8ab",
        "Content-Type": "application/json"
    }
});

//llamando info de api

api.getAppInfo()
    .then(([userData, cardsData]) => {

        userInfo.setUserInfo(userData.name, userData.about);

        // 4.2. Sección de insertado de Tarjetas (insertamos cards)
        cardList = new Section({
            items: cardsData,
            renderer: (item) => {
                const cardElement = createCard(item);
                cardList.appendItem(cardElement);
            }
        }, cardContainerSelector);

        cardList.renderItems();
    })
    .catch((err) => console.log(err));

