import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser, loadState}) {

    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, setValues, isValid, resetForm} = useFormAndValidation({defaultValues: {name: '', about: ''}, defaultValid: true});

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        resetForm();
        setValues({name: currentUser.name, about: currentUser.about});
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();   
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values['name'],
            about: values['about']
        });
    }

    return (
        <PopupWithForm name="profile" title = "Редактировать профиль" submitText = "Сохранить" 
        formValid = {isValid}
        loadState = {loadState}
        isOpen = {isOpen}
        onClose = {onClose}
        onSubmit = {handleSubmit}>
          <input
              id="input_name"
              className={`popup__input popup__input_type_profile-name ${errors['name']=='' ? '': 'popup__input-error'}`}
              type="text"
              name="name"
              required
              placeholder="Введите имя"
              minLength="3"
              maxLength="40"
              value = {values['name']}
              onChange = {handleChange}
          />
          <span id="input_name-error" className={`popup__error ${errors['name']=='' ? '' : 'popup__error_active'}`}>{errors['name']}</span>
          <input
              id="input_descriprion"
              className = {`popup__input popup__input_type_profile-descriprion ${errors['about']=='' ? '': 'popup__input-error'}`}
              type="text"
              name="about"
              required
              placeholder="Введите описание"
              minLength="2"
              maxLength="200"
              value = {values['about']}
              onChange = {handleChange}
          />
          <span id="input_descriprion-error" className={`popup__error ${errors['about']=='' ? '' : 'popup__error_active'}`}>{errors['about']}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;