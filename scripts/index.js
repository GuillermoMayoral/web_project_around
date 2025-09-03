//JavaScript para popUp

//llamar popup
const btneEditButton = document.querySelector(".profile__edit-button");
const popUpBlock = document.querySelector(".popup");
//cerrar popup
const btnClosePopUp = document.querySelector(".popup__close");
//cambiar nombre y descripcion
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__name-input");
const inputDescription = document.querySelector(".popup__description-input");
const btnChangeName = document.querySelector(".popup__button");
//llamar contenedor cards
const cardContainer = document.querySelector(".post__cards");

function openPopUp(e) {
    e.preventDefault();
    popUpBlock.classList.remove("popup_disabled");
}

function closePopUp(e) {
    e.preventDefault();
    popUpBlock.classList.add("popup_disabled");
}

function buttonDisabled(e) {
    e.preventDefault();
    if (inputName.value != "" && inputDescription.value != "") {
        btnChangeName.disabled = false;
    } else {
        btnChangeName.disabled = true;
    }
}

function changeName(e) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopUp(e);
}

btneEditButton.addEventListener("click", openPopUp);
btnClosePopUp.addEventListener("click", closePopUp);
btnChangeName.addEventListener("click", changeName);
inputName.addEventListener("input", buttonDisabled);
inputDescription.addEventListener("input", buttonDisabled);

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


    cardContainer.append(cardElemnt);
}

initialCards.forEach(item => {
    startCards(item.name, item.link)
})

//agrega funcion de like a las nuevas cards
cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("post__icon")) {
        e.target.classList.toggle("post__icon--active");
    }
});

