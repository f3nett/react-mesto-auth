import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, loadState}) {

    const avatarRef = React.useRef();
    const {handleChange, errors, isValid, resetForm} = useFormAndValidation({defaultValues: {avatar: ''}, defaultValid: false});

    React.useEffect(() => {
        resetForm();
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
        avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name = "avatar" title = "Обновить аватар" submitText = "Сохранить" 
        formValid = {isValid}
        loadState = {loadState}
        isOpen = {isOpen}
        onClose = {onClose}
        onSubmit = {handleSubmit}>
            <input
            id = "input_avatar"
            className = {`popup__input popup__input_type_avatar-link ${errors['avatar'] == '' ? '': 'popup__input-error'}`}
            type = "url"
            name = "avatar"
            required
            placeholder = "https://somewebsite.com/someimage.jpg"
            ref = {avatarRef}
            onChange = {handleChange}
            />
            <span id = "input_avatar-error" className = {`popup__error ${errors['avatar'] == '' ? '' : 'popup__error_active'}`}>{errors['avatar']}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;