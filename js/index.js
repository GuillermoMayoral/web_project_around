//JavaScript para popUp

//llamar popup
let btneEditButton = document.querySelector(".profile__edit-button");
let popUpBlock = document.querySelector(".popup");
//cerrar popup
let btnClosePopUp = document.querySelector(".popup__close");
//cambiar nombre y descripcion
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = document.querySelector(".popup__name-input");
let inputDescription = document.querySelector(".popup__description-input");
let btnChangeName = document.querySelector(".popup__button");

function openPopUp(e) {
    e.preventDefault();
    popUpBlock.classList.remove("popup--disabled");
}

function closePopUp(e) {
    e.preventDefault();
    popUpBlock.classList.add("popup--disabled");
}

function editName(e) {
    e.preventDefault();
    if (inputName.value == "" || inputDescription.value == "") {
        alert("Un campo esta vacio");
    } else {
        flag = 0;
        profileName.textContent = inputName.value;
        profileDescription.textContent = inputDescription.value;
        closePopUp(e);
    }
}

btneEditButton.addEventListener("click", openPopUp);
btnClosePopUp.addEventListener("click", closePopUp);
btnChangeName.addEventListener("click", editName);


//JavaScript para ActiveButtons

let heartButtons = document.querySelectorAll('.post__icon');

function toggleHeart(e) {
    e.preventDefault();
    e.currentTarget.classList.toggle("post__icon--active");
}

// Asigna la función a cada botón
heartButtons.forEach(button => {
    button.addEventListener('click', toggleHeart);
});