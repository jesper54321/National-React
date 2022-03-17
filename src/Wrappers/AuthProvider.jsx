import React from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react/cjs/react.production.min";

export const LoginContext = React.createContext({
	Login: "",
	setLogin: () => {},
});

export const auth = getAuth();
export var email = "";
var password = "";
export var username = "";

export function SetUser(usernameSet, emailSet) {
	username = usernameSet;
	email = emailSet;
}

export default function AuthProvider(props) {
	createUserWithEmailAndPassword(auth, email, password)
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

	return <>{props.children}</>;
}
