import style from './home.module.scss'
import houseimg from '../assets/images/Isometric-House.svg'
import { NavLink } from "react-router-dom";
import React from "react";
import { username,email } from "../../Wrappers/AuthProvider";




export default function Home() {
	return <div className={style.homeclass}>
		<div className={style.imagecontainer}>
			<img src={houseimg} alt="image_of_house" />
			<h1>Feel at home!</h1>
		</div>
		<div className={style.linkcontainer}>
			<NavLink to="/login">Log in</NavLink>
			<NavLink to="/list">Guest</NavLink>
		</div>
	</div>;
}
