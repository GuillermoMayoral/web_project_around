function closeByEscape(e) {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup:not(.popup_disabled)') ||
            document.querySelector('.popup-add-card:not(.popup_disabledCard)') ||
            document.querySelector('.big-image:not(.big-image_disabled)');
        if (openedPopup) {
            closePopUp(openedPopup);
        }
    }
}

export function openPopUp(popUp) {
    if (popUp.classList.contains('popup-add-card')) {
        popUp.classList.remove('popup_disabledCard');
    } else if (popUp.classList.contains('big-image')) {
        popUp.classList.remove('big-image_disabled');
    } else if (popUp.classList.contains('popup')) {
        popUp.classList.remove('popup_disabled');
    }

    document.addEventListener("keydown", closeByEscape);
}

export function closePopUp(popUp) {
    if (popUp.classList.contains('popup-add-card')) {
        popUp.classList.add('popup_disabledCard');
    } else if (popUp.classList.contains('big-image')) {
        popUp.classList.add('big-image_disabled');
    } else if (popUp.classList.contains('popup')) {
        popUp.classList.add('popup_disabled');
    }

    document.removeEventListener("keydown", closeByEscape);
}