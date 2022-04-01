import React from 'react';

function Register({onRegister, signinNavigate}) {
    const [data, setData] = React.useState({email:'', password:''});
    const {email, password} = data;

    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    } 

    return(
        <div className="signin">
            <form className="signin__form">
                <h1 className="signin__title">Регистрация</h1>
                <input
                id = "input_email"
                className = "signin__input"
                type = "email"
                name = "email"
                placeholder = "Email"
                value = {email}
                onChange = {handleChange}
                />
                <input
                id = "input_pass"
                className = "signin__input"
                type = "password"
                name = "password"
                placeholder = "Пароль"
                value = {password}
                onChange = {handleChange}
                />
                <button
                    className = "signin__submit-button button button_opacity_extra-lite"
                    type = "submit"
                    onClick = {handleSubmit}
                >Зарегистрироваться
                </button>
                <a className="signin__info">Уже зарегистрированы? <span className="button button_opacity_medium" onClick={signinNavigate}>Войти</span></a>
            </form>
        </div>
    )
}

export default Register; 