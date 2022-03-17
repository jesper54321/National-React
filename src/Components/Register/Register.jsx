import React, { useEffect, useState, useContext } from "react";
import "./Register.css";
//import { auth } from "../../Wrappers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../../Logic/firebase";
import { auth } from "../../Wrappers/AuthProvider";
import { SetUser } from "../../Wrappers/AuthProvider";
import FirebaseMain from "../../Logic/firebase";
import { LoginContext } from "../../Wrappers/AuthProvider";
import {
	getFirestore,
	collection,
	onSnapshot,
	query,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const setError = (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector(".error");

		errorDisplay.innerText = message;
		inputControl.classList.add("error");
		inputControl.classList.remove("success");
	};

	const setSuccess = (element) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector(".error");

		errorDisplay.innerText = "";
		inputControl.classList.add("success");
		inputControl.classList.remove("error");
	};

	const createUser = async () => {
		const docRef = await addDoc(collection(db, "Users"), {
			username: username,
			email: email,
			date: serverTimestamp(),
		});
	};

	const usernames = [];
	const emails = [];

	var usersData = FirebaseMain();

	var rightPassword = true;
	var rightEmail = true;
	var rightUser = true;

	for (var i = 0; i < usersData.Users.length; i++) {
		usernames.push(usersData.Users[i].username);
		emails.push(usersData.Users[i].email);
	}

	function checkErrors() {
		if (username !== "") {
			if (usernames.includes(username)) {
				setError(document.getElementById("usernameIn"), "Username is taken");
				rightUser = false;
			} else {
				rightUser = true;
				setSuccess(document.getElementById("usernameIn"));
			}
		} else {
			setError(document.getElementById("usernameIn"), "Username is required");
		}

		if (email !== "") {
			if (emails.includes(email)) {
				setError(document.getElementById("emailIn"), "Email is taken");
				rightEmail = false;
			} else {
				setSuccess(document.getElementById("emailIn"));
				rightEmail = true;
			}
		} else {
			setError(document.getElementById("emailIn"), "Email is required");
		}

		if (password.length < 6) {
			setError(
				document.getElementById("passwordIn"),
				"Password is less than 6 chars"
			);
			rightPassword = false;
		} else {
			setSuccess(document.getElementById("passwordIn"));
			rightPassword = true;
		}
	}

	return (
		<div className="container">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					if (rightEmail && rightPassword && rightUser) {
						createUserWithEmailAndPassword(auth, email, password)
							.then((userCredential) => {
								// Signed in
								const user = userCredential.user;
								console.log(username + " " + email);
								SetUser(username, email);
								/* setLogin({
									username: username,
									email: email,
								}); */

								navigate("/");
							})
							.catch((error) => {
								console.log(error.message);
							});
						createUser();
						setUsername("");
						setEmail("");
						setPassword("");
					}
				}}
			>
				<h1>Registration</h1>
				<div className="input-control">
					<label>Username</label>
					<input
						id="usernameIn"
						type="username"
						value={username}
						onChange={(event) =>
							setUsername(event.target.value) + checkErrors()
						}
						onClick={(event) => checkErrors()}
					/>
					<div className="error"></div>
				</div>
				<div className="input-control">
					<label>Email</label>
					<input
						id="emailIn"
						type="email"
						value={email}
						required
						min="5"
						max="16"
						onChange={(event) => setEmail(event.target.value)}
					/>
					<div className="error"></div>
				</div>
				<div className="input-control">
					<label>Password</label>
					<input
						id="passwordIn"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<div className="error"></div>
				</div>
				<div className="input-control">
					<input
						id="photodIn"
						type="username"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						style={{ backgroundColor: "#f0f0f098" }}
						readOnly
					/>

					<div className="error"></div>
				</div>
				<button type="submit">Sign up</button>
				<br></br>
				<br></br>
				<h2>Already have an account?</h2>
				<button>Log in</button>
			</form>
		</div>
	);
}
