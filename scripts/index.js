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
    avatarPopup,
    btnEditProfile,
    btnAddCard,
    formProfile,
    formAddCard,
    formAvatar,
    inputName,
    inputDescription,
    editProfile,
    editProfileImage
} from './utils/Constants.js';

//declarado de ID usuario
let userId

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
    }, (cardID, isLiked) => {
        if (isLiked) {
            api.disLikeCard(cardID)
                .then(() => {
                    card.processLike();
                })
                .catch((err) => console.log(err));
        } else {
            api.likeCard(cardID)
                .then(() => {
                    card.processLike();
                })
                .catch((err) => console.log(err));
        }
    }, userId);
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

const addAvatarFormValidator = new FormValidator(validationConfig, formAvatar);
addAvatarFormValidator.enableValidation();

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
        userId = userData._id


        userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
        // foto perfil
        editProfileImage.src = userData.avatar;
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

// Editar foto de perfil

const avatarEdit = new PopupWithForm(avatarPopup, (formData) => {
    avatarEdit.renderLoading(true);

    api.updateAvatar(formData.link)
        .then((data) => {
            editProfileImage.src = data.avatar;
            avatarEdit.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            avatarEdit.renderLoading(false);
        })
})
avatarEdit.setEventListeners();

editProfile.addEventListener("click", () => {
    addAvatarFormValidator.resetValidation();
    avatarEdit.open();
});