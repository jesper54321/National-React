import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import style from './header.module.scss'
import { NavLink } from 'react-router-dom'


export default function Header () {
    return (
        <header className={style.headerclass}>
            <div>
            <FontAwesomeIcon className={style.iconcolor} icon={faUser} />
            <h4>ALiteralNameOh</h4>
            </div>
            <NavLink to="/">Exit</NavLink>
        </header>
    )
}