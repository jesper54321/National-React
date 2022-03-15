import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import style from './header.module.scss'
import Home from '../Home/Home'


export default function Header () {
    return (
        <header className={style.headerclass}>
            <div>
            <FontAwesomeIcon className={style.iconcolor} icon={faUser} />
            <h4>ALiteralNameOh</h4>
            </div>
            <button onClick={Home}>Exit</button>
        </header>
    )
}