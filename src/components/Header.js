import React from 'react';
import { Route, Routes, NavLink} from 'react-router-dom';

function Header ({onSignOut, email}) {

    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    function toggleNavBar() {
        if (isOpenMenu) setIsOpenMenu(false)
         else setIsOpenMenu(true);
    }

    React.useEffect(() => {
        if (window.innerWidth <= 768) setIsMobile(true)
            else setIsMobile(false);
      }, []);

    function menuExit() {
        setIsOpenMenu(false);
        onSignOut();
    }

    return (
        <header className="header">
            {isOpenMenu ? 
            <div className='navigation__bar'>
                <a className='navigation__user-email navigation__user-email_type_column'>{email}</a>
                <NavLink className="navigation__link navigation__link_type_out button button_opacity_medium" to="/sign-in" onClick={menuExit}>Выйти</NavLink>
            </div> : ''}
            <div className='header__main'>
                <div className="logo header__logo"></div>
                <div className='navigation'>
                    <nav>
                        <Routes>
                            <Route path="/sign-in"
                                element={<NavLink className="navigation__link navigation__link_type_in button button_opacity_medium" to="/sign-up">Регистрация</NavLink>}>
                            </Route>
                            <Route path="/sign-up"
                                element={<NavLink className="navigation__link navigation__link_type_in button button_opacity_medium" to="/sign-in">Войти</NavLink>}>
                            </Route>
                            {isMobile ? 
                                <Route path="/main"
                                element={
                                <button className='navigation__menu-button button button_opacity_medium' 
                                type = "button"
                                aria-label = "Открыть меню"
                                onClick={toggleNavBar}></button>
                                }>
                                </Route> :
                                <Route path="/main"
                                element={
                                    <>
                                    <a className='navigation__user-email navigation__user-email_type_row'>{email}</a>
                                    <NavLink className="navigation__link navigation__link_type_out button button_opacity_medium" to="/sign-in" onClick={onSignOut}>Выйти</NavLink>
                                    </>
                                }>
                                </Route>
                            }
                        </Routes>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;