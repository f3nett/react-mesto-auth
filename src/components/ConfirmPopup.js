import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({isOpen, onClose, onSubmit, confirmObject}) {
    const formValid = true;
    const loadState = false;

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(confirmObject);
    }

    return (
        <PopupWithForm name="confirmation" title = "Вы уверены?" submitText = "Да"
        formValid = {formValid}
        loadState = {loadState}
        isOpen = {isOpen}
        onClose = {onClose}
        onSubmit = {handleSubmit}
        />
    )
}

export default ConfirmPopup;