import React from "react";
import { username, email, photo } from "../../../Wrappers/AuthProvider";

export default function Message({ data, styles, user }) {
	//console.log(user);
	const type = email === data.user_id ? "outgoing" : "incoming";
	const time = new Date(data?.createdAt?.seconds * 1000 || Date.now());
	return (
		<>
			<li className={styles[type]}>
				<article className={styles.flex}>
					<div className="infoSpot">
						<img src={user.photo} alt="" className="profileImg" />
						<h5 className="name">{user.username}</h5>
						<h6 className="createdAt">{time.toUTCString()}</h6>
					</div>
					<div className={styles.messageview}>
						<p>{data.content}</p>
					</div>
				</article>
			</li>
		</>
	);
}
