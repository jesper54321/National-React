import React, { useEffect, useState } from "react";
import Message from "./Message/Message";
import styles from "./Chat.module.scss";
import {
	getFirestore,
	collection,
	onSnapshot,
	query,
} from "firebase/firestore";
import { app } from "../../Logic/firebase.js";

const db = getFirestore(app);

const incomingColor = "";
const outgoingColor = "";

export default function Chat() {
	const [Chats, setChats] = useState([]);
	const [Users, setUsers] = useState([]);
	const [UserRef, setUserRef] = useState([]);

	useEffect(async () => {
		const q = await query(collection(db, "Chats"));
		const unsubscribe = await onSnapshot(q, (querySnapshot) => {
			const chatArray = [];
			querySnapshot.forEach((doc) => {
				chatArray.push(doc.data());
			});
			setChats([...chatArray]);
		});
	}, []);

	console.log(Chats);

	return (
		<>
			<div>
				<ul className={styles.messageList}>
					{Chats?.map((item, index) => {
						return (
							<Message
								data={item}
								type="outgoing"
								key={index}
								styles={styles}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
}
