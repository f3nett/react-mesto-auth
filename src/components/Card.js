import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `place-card__trash-button ${isOwn ? 'place-card__trash-button_active' : ''} button button_opacity_strong`
        );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `place-card__like-button ${isLiked ? 'place-card__like-button_active' : ''} button_opacity_strong`
        );

    function handleClick() {
        onCardClick(card);
    }
    
    function handleLike() {
        onCardLike(card);
    }

    function handleDelete() {
        onCardDelete(card);
    }

    return (
        <article className="place-card">
            <img className="place-card__image" src = {card.link} alt = {card.name + '.'}
            onClick = {handleClick}/>
            <button
            className={cardDeleteButtonClassName}
            type="button"
            aria-label="Удалить"
            onClick={handleDelete}
            ></button>
            <div className="place-card__place-info">
            <h2 className="place-card__title">{card.name}</h2>
            <div className="place-card__like-info">
                <button
                className={cardLikeButtonClassName}
                type="button"
                aria-label="Лайк"
                onClick={handleLike}
                ></button>
                <p className="place-card__like-counter">{card.likes.length}</p>
            </div>
            </div>
        </article>
    )
}

export default Card;