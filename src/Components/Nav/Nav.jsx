import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCommentDots, faListUl, faInfo, faAddressCard  } from '@fortawesome/free-solid-svg-icons'
import style from './nav.module.scss'

export default function Nav () {

    return (
        <nav className={style.navclass}>
            <NavLink to="/home">
            <FontAwesomeIcon className={style.iconcolor} icon={faHouse} />
            </NavLink>
            <NavLink to="/activities/chat">
            <FontAwesomeIcon className={style.iconcolor} icon={faCommentDots} />
            </NavLink>
            <NavLink to="/activities/list">
            <FontAwesomeIcon className={style.iconcolor} icon={faListUl} />
            </NavLink>
            <NavLink to="/activities/info">
            <FontAwesomeIcon className={style.iconcolor} icon={faInfo} />
            </NavLink>
            <NavLink to="/activities/contact">
            <FontAwesomeIcon className={style.iconcolor} icon={faAddressCard} />
            </NavLink>
        </nav>
    )
}