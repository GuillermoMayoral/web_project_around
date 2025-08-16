let heartButtons = document.querySelectorAll('.post__icon');

function toggleHeart(e) {
    e.preventDefault();
    e.currentTarget.classList.toggle("post__icon--active");
}

// Asigna la función a cada botón
heartButtons.forEach(button => {
    button.addEventListener('click', toggleHeart);
});