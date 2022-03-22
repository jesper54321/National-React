import React from "react";
import styles from "./Comments.module.scss";

export default function Comments() {
	return (
		<article className={styles.commentMessage}>
			<div className={styles.flex}>
				<img src="https://picsum.photos/seed/picsum/900/900" alt="" />
				<div className={styles.container}>
					<div className={styles.flex}>
						<h4 className={styles.name}>Jesper</h4>
						<h6 className={styles.createdAt}>12 march 2021</h6>
					</div>
					<p className={styles.message}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
						fugit nesciunt praesentium laudantium nulla, soluta nam quibusdam
					</p>
				</div>
			</div>
		</article>
	);
}
