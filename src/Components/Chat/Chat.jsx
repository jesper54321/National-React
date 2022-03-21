import React, { useEffect, useState, useContext } from "react";
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
import { app, addDocument, pullDocument } from "../../Logic/firebase.js";
import { LoginContext, email, username } from "../../Wrappers/AuthProvider";

const db = getFirestore(app);

const incomingColor = "";
const outgoingColor = "";

export default function Chat() {
	const { Login, setLogin } = useContext(LoginContext);
	const [Chats, setChats] = useState([]);
	const [Users, setUsers] = useState({});

	useEffect(async () => {
		const tempObj = {};
		for (const key in Users) {
			tempObj[key] = Users[key];
		}
		Users.Length = 0;
		for (const item of Chats) {
			if (!tempObj[item.user_id]) {
				tempObj[item.user_id] = "";
			}
		}

		for (const key in tempObj) {
			if (tempObj[key] === "") {
				tempObj[key] = await pullDocument("Users", key);
				console.log("user = " + tempObj[key]);
			}
		}
		setUsers(tempObj);
		console.log(tempObj);
	}, [Chats]);

	const sendChat = async () => {
		const messageText = document.getElementById("message").value;
		if (messageText != "" && messageText != " ") {
			document.getElementById("message").value = "";

			const docRef = await addDocument("Chats", {
				content: messageText,
				createdAt: serverTimestamp(),
				user_id: "msy6foxquLONDY76Ptqa",
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
			<div className={styles.chatcontainer}>
				<ul className={styles.messageList}>
					{Chats?.map((item, index) => {
						return Users[item.user_id] ? (
							<Message
								data={item}
								key={index}
								styles={styles}
								user={Users[item.user_id]}
							/>
						) : (
							""
						);
					})}
				</ul>
				<div className={styles.messageclass}>
					<textarea
						name="message"
						id="message"
						placeholder="Write your message here..."
						required
					></textarea>
					<button onClick={sendChat}>Send Message</button>
				</div>
			</div>
		</>
	);
}
