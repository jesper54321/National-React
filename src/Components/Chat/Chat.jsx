import React, { useEffect, useState, useContext, useRef } from "react";
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
	where,
	Timestamp
} from "firebase/firestore";
import { app, addDocument, pullDocument } from "../../Logic/firebase.js";
import { useNavigate } from "react-router-dom";
import { username, email, photo } from "../../Wrappers/AuthProvider";

const db = getFirestore(app);
const startTime = new Date;

export default function Chat() {
	let navigate = useNavigate();

	if (!username || !email) {
		useEffect(() => {
			navigate("/");
		}, []);

		return <></>;
	} else {
		const [Chats, setChats] = useState([]);
		const [Users, setUsers] = useState({});
		const messagesEndRef = useRef(null);

		const scrollToBottom = () => {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		};

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
				}
			}
			setUsers(tempObj);
			scrollToBottom();
		}, [Chats]);

		const sendChat = async () => {
			const messageText = document.getElementById("message").value;
			if (messageText != "" && messageText != " ") {
				document.getElementById("message").value = "";

				const docRef = await addDocument("Chats", {
					content: messageText,
					createdAt: serverTimestamp(),
					user_id: email,
				});
			}
		};

		useEffect(async () => {
			const q = query(
				collection(db, "Chats"),
				where("createdAt", ">", Timestamp.fromDate(startTime) ),
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const chatArray = [];
				querySnapshot.forEach((doc) => {
					const tempData = doc.data();
					tempData.id = doc.id;
					chatArray.push(tempData);
				});
				chatArray.reverse();
				setChats([...chatArray]);
			});
		}, []);

		return (
			<>
				<div className={styles.chatcontainer}>
					<ul className={styles.messageList} id="messageList">
						{Chats?.map((item, index) => {
							return Users[item.user_id] ? (
								<Message
									data={item}
									key={item.id}
									styles={styles}
									user={Users[item.user_id]}
								/>
							) : (
								""
							);
						})}
						<div ref={messagesEndRef} />
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
}
