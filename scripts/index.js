//JavaScript para popUp

//llamar popup edit perfil
const btnEditButton = document.querySelector(".profile__edit-button");
const popUpBlock = document.querySelector(".popup");
//llamar popuo agregar card
const btnAddCard = document.querySelector(".profile__button");
const popUpCard = document.querySelector(".popup-add-card");
//cerrar popup
const btnClosePopUp = document.querySelector(".popup__close");
//cerrar popup card
const btnClosePopUpCard = document.querySelector(".popup__close-add-card");
//cambiar nombre y descripcion
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__name-input");
const inputDescription = document.querySelector(".popup__description-input");
const btnChangeName = document.querySelector(".popup__button");
//añadir titulo y enlace
const inputTitle = popUpCard.querySelector(".popup__name-input");
const inputLink = popUpCard.querySelector(".popup__description-input");
const btnPushCard = popUpCard.querySelector(".popup__button");
//llamar contenedor cards
const cardContainer = document.querySelector(".post__cards");
//llamar trash icon
const trashIcon = document.querySelector(".post__trash");
//cerrar bigImage
const blockImage = document.querySelector(".big-image");
const closeImage = document.querySelector(".big-image__close");

//abrir popup editar perfil
function openPopUp(e) {
    e.preventDefault();
    popUpBlock.classList.remove("popup_disabled");
}

function closePopUp(e) {
    e.preventDefault();
    popUpBlock.classList.add("popup_disabled");
}

popUpBlock.addEventListener('mousedown', (e) => {
    if (e.target === popUpBlock) {
        closePopUp(e);
    }
});

function changeName(e) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopUp(e);
}

//abrir popup agregar card
function openPopUpCard(e) {
    e.preventDefault();
    popUpCard.classList.remove("popup_disabledCard");
}

function closePopUpCard(e) {
    e.preventDefault();
    popUpCard.classList.add("popup_disabledCard");
}

popUpCard.addEventListener('mousedown', (e) => {
    if (e.target === popUpCard) {
        closePopUpCard(e);
    }
});

function pushCard(e) {
    startCards(inputTitle.value, inputLink.value)
    closePopUpCard(e);
}

//cerrar con esq
document.addEventListener('keydown', (event) => {
    // Verificamos si la tecla presionada fue "Escape"
    if (event.key === 'Escape' && !popUpCard.classList.contains('popup_disabledCard')) {
        popUpCard.classList.add("popup_disabledCard");
    } else if (event.key === 'Escape' && !popUpBlock.classList.contains('popup_disabled')) {
        popUpBlock.classList.add("popup_disabled");
    }
});

btnEditButton.addEventListener("click", openPopUp);
btnClosePopUp.addEventListener("click", closePopUp);

btnChangeName.addEventListener("click", changeName);

btnAddCard.addEventListener("click", openPopUpCard);
btnClosePopUpCard.addEventListener("click", closePopUpCard);

btnPushCard.addEventListener("click", pushCard);


const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
];



function startCards(name, link) {
    const cardTemplate = document.querySelector("#cards").content;
    const cardElemnt = cardTemplate.querySelector(".post__card").cloneNode(true);

    cardElemnt.querySelector(".post__title").textContent = name;
    cardElemnt.querySelector(".post__images").src = link;
    cardElemnt.querySelector(".post__images").alt = name;


    cardContainer.prepend(cardElemnt);
}

initialCards.reverse().forEach(item => {
    startCards(item.name, item.link)
})

//agrega funcion de like a las nuevas cards
cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("post__icon")) {
        e.target.classList.toggle("post__icon--active");
    }

    //funcion borrar card
    if (e.target.classList.contains("post__trash")) {
        const cardToDelete = e.target.closest(".post__card");
        cardToDelete.remove();
    }

    //abrir imagen
    if (e.target.classList.contains("post__images")) {
        const openImage = e.target.closest(".post__images");
        const bigImage = openImage.src;
        const textImage = openImage.alt;


        const newImage = blockImage.querySelector(".big-image__image");
        const newText = blockImage.querySelector(".big-image__text");

        blockImage.classList.remove("big-image_disabled");
        newImage.src = bigImage;
        newText.textContent = textImage;
    }
});

//abrir imagen grande

closeImage.addEventListener("click", () => {
    blockImage.classList.add("big-image_disabled");
})

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});