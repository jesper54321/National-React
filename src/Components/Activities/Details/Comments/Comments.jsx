import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { addDocument, db } from "../../../../Logic/firebase";
import {
	serverTimestamp,
	collection,
	where,
	orderBy,
	getDocs,
	query,
} from "firebase/firestore";
import { email } from "../../../../Wrappers/AuthProvider";

export default function Comments({ id }) {
	const [comments, setComments] = useState([]);
	useEffect(async () => {
		const q = query(collection(db, "Comments"));
		const documentArray = [];

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const tempData = doc.data();
			tempData.id = doc.id;
			documentArray.push(tempData);
			setComments(documentArray);
		});
	}, []);

	console.log(comments);

	return (
		<>
			<div className={styles.chatControl}>
				<textarea
					className={styles.chatMessage}
					placeholder="Write your message here..."
				></textarea>
				<button
					className={styles.chatSend}
					onClick={(e) => {
						addDocument("Comments", {
							content: document.querySelector("." + styles.chatMessage)
								.textContent,
							createdAt: serverTimestamp(),
							place_id: id,
							user_id: email,
						});
					}}
				>
					Send
				</button>
			</div>
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
		</>
	);
}
