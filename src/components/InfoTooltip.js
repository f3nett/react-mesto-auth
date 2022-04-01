import React from 'react';
import signin_success from '../images/logo/signin_success.svg';
import signin_error from '../images/logo/signin_error.svg';

function InfoTooltip({isOpen, onClose, isError}) {

    return(
        <div className={`popup popup_opacity_strong ${isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_info-tooltip`}>
            <button
                className = "popup__close-button button button_opacity_medium"
                type = "button"
                aria-label = "Закрыть"
                onClick = {onClose}
            ></button>
            <img
            className="popup__info-image"
            src={isError ? signin_error : signin_success}
            alt="Успех."
            />
            {isError ? <a className="popup__info-text">Что-то пошло не так! &nbsp; Попробуйте ещё раз.</a> : <a className="popup__info-text">Вы успешно &nbsp; зарегистрировались!</a>}
        </div>
        </div>
    )

}

export default InfoTooltip;