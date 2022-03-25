class Api {
    constructor({url, token}) {
        this._url = url;
        this._token = token;
    }

    _checkResponse(res) {
    //проверка ответа
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUser() {
    //получение информации о пользователе
        return fetch(`${this._url}/users/me`, {
            headers: {
              authorization: this._token
            }
          })
            .then(this._checkResponse)
    }

    setUserData(userData) {
    //обновление информации о пользователе
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: userData.name, about: userData.about})
        })
            .then(this._checkResponse)
    }

    setUserPhoto(userPhoto) {
    //обновление аватара пользователя
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: userPhoto.avatar})
        })
            .then(this._checkResponse)
    }

    getCards() {
    //получение стартового набора карточек с сервера
        return fetch(`${this._url}/cards`, {
            headers: {
              authorization: this._token
            }
          })
            .then(this._checkResponse)
    }

    postCard(card) {
    //пост новой карточки на сервер
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: card.name, link: card.link})
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
    //удаление карточки по ее id
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResponse)
    }

    addLike(cardId) {
    //добавление лайка карточке
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResponse)
    }

    deleteLike(cardId) {
    //удаление лайка с карточки
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResponse)       
    }
}

const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-34', token: 'f9818e95-aa05-4a44-a493-1bf7e5072c11'});

export default api;