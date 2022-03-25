import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({isOpen, onClose, onUpdatePlace, loadState}) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation({defaultValues: {name: '', link: ''}, defaultValid: false});

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdatePlace({
          name: values['name'],
          link: values['link']
        });
    }
    

    return (
        <PopupWithForm name="place" title = "Новое место" submitText = "Создать" 
        formValid = {isValid}
        loadState = {loadState}
        isOpen = {isOpen}
        onClose = {onClose}
        onSubmit = {handleSubmit}>
          <input
            id="input_place"
            className={`popup__input popup__input_type_place-name ${errors['name'] == '' ? '': 'popup__input-error'}`}
            type="text"
            name="name"
            required
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value = {values['name']}
            onChange = {handleChange}
          />
          <span id="input_place-error" className={`popup__error ${errors['name'] == '' ? '' : 'popup__error_active'}`}>{errors['name']}</span>
          <input
            id="input_url"
            className={`popup__input popup__input_type_place-url ${errors['link'] == ''  ? '': 'popup__input-error'}`}
            type="url"
            name="link"
            required
            placeholder="Ссылка на картинку"
            value = {values['link']}
            onChange = {handleChange}
          />
          <span id="input_url-error" className={`popup__error ${errors['link'] == '' ? '' : 'popup__error_active'}`}>{errors['link']}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;