import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: null, link: null});
  const [currentUser, setCurrentUser] = React.useState({id: null, name: '', about: '', avatar: ''});
  const [cards, setCards] = React.useState([]);
  const [removedCard, setRemovedCard] = React.useState('');
  const [loadState, setLoadState] = React.useState(false);
  
  React.useEffect(() => {
      Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => {
          console.log(err);
      })
  }, []);
    
  function handleUpdateUser(currentUser) {
    api.setUserData(currentUser)
      .then((userData) => {
        setLoadState(true);
        setCurrentUser(userData);
        console.log('Информация о пользователе обновлена:', userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoadState(false))
  }

  function handleUpdateAvatar(avatar) {
    api.setUserPhoto(avatar)
      .then((newUserData) => {
        setLoadState(true);
        setCurrentUser(newUserData);
        console.log('Установлен новый аватар:', newUserData.avatar);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoadState(false))
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
    .then(res => {
      setLoadState(true);
      setCards([res, ...cards]);
      console.log('Добавлена новая карточка:', res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setLoadState(false))
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        });
    }
    }
  
  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setRemovedCard(card._id);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link});
  }

  function handleConfirmDelete(removedCard) {
    api.deleteCard(removedCard)
    .then((res) => {
      setCards((card) => card.filter(c => c._id != removedCard).map((c) => c));
      console.log(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({name: null, link: null});
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Header />
          <Main 
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
          />
        <Footer />
      </div>
      <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>
      <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} loadState = {loadState}/>
      <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onUpdatePlace = {handleAddPlaceSubmit} loadState = {loadState}/>
      <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} loadState = {loadState}/>
      <ConfirmPopup isOpen = {isConfirmPopupOpen} onClose = {closeAllPopups} onSubmit = {handleConfirmDelete} confirmObject = {removedCard}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
