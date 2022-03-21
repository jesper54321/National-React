import React from "react";

export default function Message({ data, styles }) {
	const user = "L85fp20Yz0t4vFKbJY92";
	const type = user == data.user_id ? "outgoing" : "incoming";
	const time = new Date(data?.createdAt?.seconds * 1000 || Date.now());
	return (
		<>
			<li>
				<article className={styles.flex}>
					<div className="infoSpot">
						<img src="" alt="" className="profileImg" />
						<h5 className="name"></h5>
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
