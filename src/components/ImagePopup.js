import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image popup_opacity_lite ${(card.name !== null) ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
                <button
                    className="popup__close-button button button_opacity_medium"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <img className="popup__card-image" src={card.link} alt={card.name} />
                <h2 className="popup__card-image-title">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;