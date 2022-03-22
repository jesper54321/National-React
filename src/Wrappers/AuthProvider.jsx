import React from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app, pullDocument } from "../Logic/firebase";

export const auth = getAuth(app);
export var email = "";
export var username = "";
export var photo = "";

export async function SetUser(emailSet) {
	const tempData = await pullDocument("Users", emailSet);
	username = tempData.username;
	email = tempData.email;
	photo = tempData.photo;
	console.log(username, email, photo);
	return true;
}

export default function AuthProvider(props) {
	/*createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			setLogin({
				username: username,
				email: email,
			});
		})
		.catch((error) => {
			console.log(error.message);
		});

	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
	*/
	return <>{props.children}</>;
}
