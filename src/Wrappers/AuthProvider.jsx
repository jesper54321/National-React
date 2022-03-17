import React from "react";
import { getAuth } from "firebase/auth";
import { app } from "../Logic/firebase";

export const auth = getAuth(app);
export var email = ""; export var username = "";


export function SetUser(usernameSet,emailSet){
	username= usernameSet;
	email= emailSet;
}


export default function AuthProvider(props) {
	/*createUserWithEmailAndPassword(auth, email, password)
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
	});*/

	return <>{props.children}</>;
}
