import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import style from "./header.module.scss";
import { username, email, photo } from "../../Wrappers/AuthProvider";

export default function Header() {
	return (
		<header className={style.headerclass}>
			{username && email ? (
				<>
					<div>
						<img src={photo} alt="" style={{height:"18%",width:"18%"}}/>
						<h4>{username}</h4>
					</div>
					<NavLink to="/">Out</NavLink>
				</>
			) : (
				<>
					<div>
						<FontAwesomeIcon className={style.iconcolor} icon={faUser} />
						<h4>Guest</h4>
					</div>
					<NavLink to="/">Out</NavLink>
				</>
			)}
		</header>
	);
}
