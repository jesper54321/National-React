import React, { useEffect, useState } from "react";
import Message from "./Message/Message";
import styles from "./Chat.module.scss";
import {
	getFirestore,
	collection,
	onSnapshot,
	query,
	addDoc,
	serverTimestamp,
	orderBy,
	limit,
} from "firebase/firestore";
import { app, addDocument } from "../../Logic/firebase.js";

const db = getFirestore(app);

const incomingColor = "";
const outgoingColor = "";

export default function Chat() {
	const [Chats, setChats] = useState([]);
	const [Users, setUsers] = useState([]);
	const [UserRefs, setUserRefs] = useState([]);

	const handleUserArrays = () => {
		for (const item of Chats) {
			if (!UserRefs.includes(item.user_id)) {
				setTimeout(() => {
					for (let index = 0; index < 50; index++) {
						UserRefs.push(item.user_id);
						console.log(item.id);
					}
					setUserRefs(UserRefs);
				}, 3000);
			}
		}
	};

	const updateUserData = () => {};

	const sendChat = async () => {
		const messageText = document.getElementById("message").value;
		if (messageText != "" && messageText != " ") {
			document.getElementById("message").value = "";

			const docRef = await addDocument("Chats", {
				content: messageText,
				createdAt: serverTimestamp(),
				user_id: "Wn3stJzJsNedzvyzEpov",
			});
			console.log("Document written with ID: ", docRef.id);
		}
	};

	useEffect(async () => {
		const q = await query(
			collection(db, "Chats"),
			orderBy("createdAt", "desc"),
			limit(10)
		);
		const unsubscribe = await onSnapshot(q, (querySnapshot) => {
			const chatArray = [];
			querySnapshot.forEach((doc) => {
				chatArray.push(doc.data());
			});
			chatArray.reverse();
			setChats([...chatArray]);
		});
	}, []);

	return (
		<>
			<div>
				<ul className={styles.messageList}>
					{Chats?.map((item, index) => {
						return <Message data={item} key={index} styles={styles} />;
					})}
					<textarea
						name="message"
						id="message"
						placeholder="Write your message here..."
						required
					></textarea>
					<button onClick={sendChat}>Send Message</button>
				</ul>
			</div>
		</>
	);
}
