export default class Card {
    constructor(data, cardSelector, handleImageClick, handleDeleteClick, handleHeartClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._isLiked = data.isLiked;
        this._userId = userId;
        this._ownerId = data.owner;

        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteCard = handleDeleteClick;
        this._handleHeartClick = handleHeartClick;
    }

    _getTemplate() {
        //De aqui extraemos el teamplate de la card y lo clonamos
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".post__card").cloneNode(true);

        return cardElement
    }

    processLike() {
        //llamado del like
        this._likeButton.classList.toggle("post__icon-active");
        this._likeButton.classList.toggle("post__icon");
        this._isLiked = !this._isLiked;
    }


    _handleLikeClick() {
        //funcion like
        const isLiked = this._likeButton.classList.contains('post__icon-active');
        this._handleHeartClick(this._id, isLiked);
    }

    _handleDeleteClick() {
        //funcion borrar   
        this._handleDeleteCard(this._id);
    }

    delete() {
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

        if (this._isLiked) {
            this._likeButton.classList.add("post__icon-active");
            this._likeButton.classList.remove("post__icon");
        }

        //si no es el mismo usuario no puedes borrar
        if (this._ownerId !== this._userId) {
            this._trashButton.remove();
        }

        return this._element;
    }
}