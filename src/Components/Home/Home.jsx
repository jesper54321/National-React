import style from './home.module.scss'
import houseimg from '../assets/images/Isometric-House.svg'
import { NavLink } from "react-router-dom";



export default function Home() {
	return <div className={style.homeclass}>
		<img src={houseimg} alt="image_of_house" />
		<h2>Feel at home!</h2>
		<NavLink>Login</NavLink>
		<NavLink>Register</NavLink>
	</div>;
}
