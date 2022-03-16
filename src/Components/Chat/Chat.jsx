import React, { useEffect, useState } from "react";
import Message from "./Message/Message";
import styles from "./Chat.module.scss";
import firebase, { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	onSnapshot,
	query,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { app } from "../../Logic/firebase.js";

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
					}
					setUserRefs(UserRefs);
				}, 3000);
			}
		}
	};

	const updateUserData = () => {};

	const sendChat = async () => {
		const docRef = await addDoc(collection(db, "Chats"), {
			content:
				"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio 						provident temporibus corporis voluptatibus blanditiis est. Dolor 						soluta ipsam qui cumque provident cum, nulla quibusdam, nemo, ipsum 						voluptates impedit amet consectetur. Ex eaque assumenda veniam quam 						eum excepturi libero reiciendis ratione!",
			createdAt: serverTimestamp(),
			user_id: "L85fp20Yz0t4vFKbJY92",
		});
		console.log("Document written with ID: ", docRef.id);
	};

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
	console.log(UserRefs);

	handleUserArrays();

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
					<button onClick={sendChat}>Send Message</button>
				</ul>
			</div>
		</>
	);
}
