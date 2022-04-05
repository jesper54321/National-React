import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { addDocument, db, pullDocument } from "../../../../Logic/firebase";
import {
	serverTimestamp,
	collection,
	where,
	getDocs,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import { email } from "../../../../Wrappers/AuthProvider";

export default function Comments({ id }) {
	const [comments, setComments] = useState([]);
	const [Users, setUsers] = useState({});
	useEffect(async () => {
		const q = query(collection(db, "Comments"), where("place_id", "==", id));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const chatArray = [];
			querySnapshot.forEach((doc) => {
				const tempData = doc.data();
				tempData.id = doc.id;
				chatArray.push(tempData);
			});
			chatArray.reverse();
			setComments([...chatArray]);
		});
	}, []);

	useEffect(async () => {
		const tempObj = {};
		for (const key in Users) {
			tempObj[key] = Users[key];
		}
		Users.Length = 0;
		for (const item of comments) {
			if (!tempObj[item.user_id]) {
				tempObj[item.user_id] = "";
			}
		}

		for (const key in tempObj) {
			if (tempObj[key] === "") {
				tempObj[key] = await pullDocument("Users", key);
			}
		}
		setUsers(tempObj);
	}, [comments]);

	return (
		<>
			<div className={styles.chatControl}>
				<textarea
					className={styles.chatMessage}
					id="commentMessage"
					placeholder="Write your message here..."
				></textarea>
				<button
					className={styles.chatSend}
					onClick={(e) => {
						addDocument("Comments", {
							content: document.getElementById("commentMessage").value,
							createdAt: serverTimestamp(),
							place_id: id,
							user_id: email,
						});
						document.getElementById("commentMessage").value = "";
					}}
				>
					Send
				</button>
			</div>
			{comments?.map((item, index) => {
				return (
					<article className={styles.commentMessage} key={item.id}>
						<div className={styles.flex}>
							<img src={Users[item.user_id]?.photo} alt="" />
							<div className={styles.container}>
								<div className={styles.flex}>
									<h4 className={styles.name}>
										{Users[item.user_id]?.username}
									</h4>
									<h6 className={styles.createdAt}>{Date(item.createdAt)}</h6>
								</div>
								<p className={styles.message}>{item.content}</p>
							</div>
						</div>
					</article>
				);
			})}
		</>
	);
}
