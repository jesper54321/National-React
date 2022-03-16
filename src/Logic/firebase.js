import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore, collection, onSnapshot, doc, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { logDOM } from "@testing-library/react";

export const app = initializeApp({
	apiKey: "AIzaSyCggZEKFDO1qfTaZYFIveKXA1VUzPxrBU0",
	authDomain: "national-react-app.firebaseapp.com",
	projectId: "national-react-app",
	storageBucket: "national-react-app.appspot.com",
	messagingSenderId: "1032413917454",
	appId: "1:1032413917454:web:29ae3cee974acc4e1ea75f",
});

const dbSettings = ["Users", "Visited", "Places", "Comments"];

export const db = getFirestore(app);

export const auth = getAuth();

const unsubscribe = [];

export default function FirebaseMain() {
	const [dbData, setDbData] = useState({
		Users: [],
		Comments: [],
		Visited: [],
		Places: [],
	});
	useEffect(async () => {
		for (const key of dbSettings) {
			const q = query(collection(db, key));
			unsubscribe.push(
				onSnapshot(q, (querySnapshot) => {
					setDbData({
						Users: [],
						Comments: [],
						Visited: [],
						Places: [],
					});
					const data = { ...dbData };
					querySnapshot.forEach((doc) => {
						data[key].push(doc.data());
					});
					setDbData(data);
				})
			);
		}
	}, []);
	return dbData;
	//return <div>{dbData.Users[0]?.display_name}</div>;
}
