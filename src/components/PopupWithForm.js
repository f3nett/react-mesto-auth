import React from 'react';

function PopupWithForm({name, title, submitText, isOpen, onClose, children, onSubmit, formValid, loadState}) {
    return (
    <div className={`popup popup_type_${name} popup_opacity_strong ${isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_${name}`}>
            <button
                className = "popup__close-button button button_opacity_medium"
                type = "button"
                aria-label = "Закрыть"
                onClick = {onClose}
            ></button>
            <form className="popup__form" name={`${name}Form`} noValidate onSubmit = {onSubmit}>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button
                    className = {`popup__submit-button button button_opacity_lite ${formValid ? '' : 'popup__submit-button_inactive'}`}
                    type = "submit"
                >
                    {loadState ? 'Сохранение...' : submitText}
                </button>
            </form>
        </div>
    </div>
    )
}

export default PopupWithForm;