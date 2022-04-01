import React from 'react';

function Login({onLogin}) {
    const [data, setData] = React.useState({email:'', password:''});
    const {email, password} = data;

    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) {
            return;
        }
        onLogin(email, password);
    }

    return(
        <div className="signin">
            <form className="signin__form">
                <h1 className="signin__title">Вход</h1>
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
                    className = "signin__submit-button button button_opacity_extra"
                    type = "submit"
                    onClick={handleSubmit}
                >Войти
                </button>
            </form>
        </div>
    )
}

export default Login;