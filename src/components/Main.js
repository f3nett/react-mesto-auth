import React from 'react';
import Card from './Card';
import logo from '../images/logo/edit_icon.svg';
import add_button from '../images/logo/add_button.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
            <div className="profile__block">
                <div className="profile__avatar-area">
                <img
                    className="profile__avatar"
                    src={currentUser.avatar}
                    alt="Аватар пользователя."
                    onClick = {onEditAvatar}
                />
                </div>
                <div className="profile__info">
                <div className="profile__name-section">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                    className="profile__edit-button button button_opacity_medium"
                    type="button"
                    onClick = {onEditProfile}
                    >
                    <img
                        className="profile__edit-icon"
                        src={logo}
                        alt="Редактировать информацию о пользователе."
                    />
                    </button>
                </div>
                <p className="profile__description">{currentUser.about}</p>
                </div>
            </div>
            <button
                className="profile__add-button button button_opacity_medium"
                type="button"
                onClick = {onAddPlace}
            >
                <img
                className="profile__add-icon"
                src={add_button}
                alt="Добавить новое изображение."
                />
            </button>
            </section>
            <section className="places">
                {cards.map((card) => <Card key = {card._id} card={card} onCardClick = {onCardClick} onCardLike = {onCardLike} onCardDelete = {onCardDelete}/>)}
            </section>
      </main>
    )
}

export default Main;