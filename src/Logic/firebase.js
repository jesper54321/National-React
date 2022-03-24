import React from "react";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	onSnapshot,
	doc,
	query,
	orderBy,
	limit,
	getDoc,
	getDocs,
	setDoc,
	where,
	addDoc,
} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";

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

//Function call, requires "collection", "document_id"
//pullDocument("Comments", "UoD9y5gCJEpiuhrZPivG");
export const pullDocument = async (database, document) => {
	const docSnap = await getDoc(doc(db, database, document));

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

//Function call, requires "collection"
//pullCollection("Users")
export const pullCollection = async (database) => {
	const q = query(collection(db, database));
	const documentArray = [];

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const tempData = doc.data();
		tempData.id = doc.id;
		documentArray.push(tempData);
	});
	return documentArray;
};

//Function call, requires "collection", data as an object with the field names
//addDocument("Comments", {content: "testing add document", createdAt: serverTimestamp()});
export const addDocument = async (database, data) => {
	const docRef = await addDoc(collection(db, database), data);
	return docRef.id;
};

export const pullImages = async (id) => {
	const q = await query(
		collection(db, "Places", id, "Images"),
		orderBy("order", "desc")
	);
	const documentArray = [];

	const querySnapshot = await getDocs(q);
	await querySnapshot.forEach(async (doc) => {
		const tempData = {};
		const temp = await doc.data();
		for (const iterator in temp) {
			tempData[iterator] = await temp[iterator];
		}
		tempData["id"] = await doc.id;
		await documentArray.push(await tempData);
	});
	console.log(documentArray);
	return await documentArray;
};
