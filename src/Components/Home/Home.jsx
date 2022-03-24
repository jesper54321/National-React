import style from "./home.module.scss";
import national from "../../asset/images/national-react-logo.png";
import { NavLink } from "react-router-dom";
import React from "react";
import { username, email, photo } from "../../Wrappers/AuthProvider";

export default function Home() {
	return (
		<div className={style.homeclass}>
			<div className={style.imagecontainer}>
				<h1>National React</h1>
			</div>
			<div className={style.linkcontainer}>
				{username && email ? (
					<NavLink to="/activities/map">Continue</NavLink>
				) : (
					<>
						<NavLink to="/login">Log in</NavLink>
						<NavLink to="/activities/map">Continue as guest</NavLink>
					</>
				)}
			</div>
		</div>
	);
}
