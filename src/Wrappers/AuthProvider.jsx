import React from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const auth = getAuth();

export default function AuthProvider(props) {
	const email = ""; const password = "";
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
		})
		.catch((error) => {
			console.log(error.message);
		});

	signOut(auth).then(() => {
		// Sign-out successful.
	}).catch((error) => {
		// An error happened.
	});

	

	return <>{props.children}</>;
}
