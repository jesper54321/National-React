import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import style from './header.module.scss'
import Register from '../Register/Register'
import { NavLink } from 'react-router-dom'


export default function Header() {
    return (
        <header className={style.headerclass}>
            <div>
                <FontAwesomeIcon className={style.iconcolor} icon={faUser} />
                <h4>ALiteralNameOh</h4>
            </div>
            <nav className={style.navclass}>
                <NavLink to="/register">
                    <button onClick={Register}>Exit</button>
                </NavLink>
            </nav>
            <NavLink to="/">Exit</NavLink>
        </header>
    )
}