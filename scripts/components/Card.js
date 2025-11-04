export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        //De aqui extraemos el teamplate de la card y lo clonamos
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".post__card").cloneNode(true);

        return cardElement
    }

    _handleLikeClick() {
        //funcion like
        this._likeButton.classList.toggle("post__icon-active");
        this._likeButton.classList.toggle("post__icon");


    }

    _handleDeleteClick() {
        //funcion borrar
        this._element.remove();
    }

    _setEventListeners() {
        //eventos 1- para dar like, 2- para borrar, 3-para popop bigImage
        this._likeButton = this._element.querySelector(".post__icon");
        this._trashButton = this._element.querySelector(".post__trash");
        this._cardImage = this._element.querySelector(".post__images");

        this._likeButton.addEventListener("click", () => this._handleLikeClick());
        this._trashButton.addEventListener("click", () => this._handleDeleteClick());
        this._cardImage.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners(); //activar eventos

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".post__title").textContent = this._name;

        return this._element;
    }
}