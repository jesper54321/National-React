import React, { useEffect, useState } from "react";
import "./Register.scss";
import { NavLink } from "react-router-dom";
//import { auth } from "../../Wrappers/AuthProvider";
import { useNavigate } from "react-router-dom";
import FirebaseMain, { db } from "../../Logic/firebase";
import { auth } from "../../Wrappers/AuthProvider";
import { SetUser } from "../../Wrappers/AuthProvider";
//import style from './register.module.scss'
import {
	getFirestore,
	collection,
	onSnapshot,
	query,
	addDoc,
	serverTimestamp,
	doc,
	setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomPopup from "./CustomPopup";
export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [photo, setPhoto] = useState("");
	const [visibility, setVisibility] = useState(false);
	let user_id;
	const popupCloseHandler = (e) => {
		setVisibility(e);
	};
	const navigate = useNavigate();

	const updateNNavigate = async () => {
		await SetUser(username, email);
		navigate("/activities/	");
	};

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
		const docRef = doc(db, "Users", email.toLowerCase());
		await setDoc(docRef, {
			username: username.toLowerCase(),
			email: email.toLowerCase(),
			date: serverTimestamp(),
			photo: photo,
		});
		/* const docRef = await addDoc(collection(db, "Users"), {
			username: username.toLowerCase(),
			email: email.toLowerCase(),
			date: serverTimestamp(),
			photo: photo,
		}); */
	};
	const usernames = [];
	const emails = [];
	var usersData = FirebaseMain();
	var rightPassword = false;
	var rightEmail = false;
	var rightUser = false;
	for (var i = 0; i < usersData.Users.length; i++) {
		usernames.push(usersData.Users[i].username.toLowerCase());
		emails.push(usersData.Users[i].email.toLowerCase());
	}
	function checkErrors() {
		if (username !== "") {
			if (usernames.includes(username.toLowerCase())) {
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
			if (emails.includes(email.toLowerCase())) {
				setError(document.getElementById("emailIn"), "Email is taken");
				rightEmail = false;
			} else {
				if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
					setError(document.getElementById("emailIn"), "Enter a valid email");
					rightEmail = false;
				} else {
					setSuccess(document.getElementById("emailIn"));
					rightEmail = true;
				}
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
		if (photo !== "") {
			setSuccess(document.getElementById("photoIn"));
		} else {
			setError(document.getElementById("photoIn"), "Choose a photo");
		}
	}
	return (
		<div className="container">
			<input type="hidden" name="dkjnasfds" value={photo} />
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					checkErrors();
					if (rightEmail && rightPassword && rightUser && photo !== "") {
						createUserWithEmailAndPassword(auth, email, password)
							.then((userCredential) => {
								// Signed in
								createUser();
								const user = userCredential.user;
								console.log(username + " " + email);
								updateNNavigate();
							})
							.catch((error) => {
								console.log(error.message);
							});
						setUsername("");
						setEmail("");
						setPassword("");
					}
				}}
			>
				<h1>Register</h1>
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
						onChange={(event) => setEmail(event.target.value) + checkErrors()}
						onClick={(event) => checkErrors()}
					/>
					<div className="error"></div>
				</div>
				<div className="input-control">
					<label>Password</label>
					<input
						id="passwordIn"
						type="password"
						value={password}
						onChange={(event) =>
							setPassword(event.target.value) + checkErrors()
						}
						onClick={(event) => checkErrors()}
					/>
					<div className="error"></div>
					<br></br>
				</div>
				<div className="input-control">
					<label style={{ display: "block", marginInline: "auto" }}>
						Profile photo
					</label>
					<img
						src={
							photo ||
							"https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/image-icon-png-6.jpg?alt=media&token=6d98349b-cb4f-424e-807c-ae1956d07ad3"
						}
						style={{
							width: "75px",
							height: "75px",
							borderRadius: "50%",
							border: "2px solid #111",
							display: "block",
							marginInline: "auto",
						}}
						onClick={(e) => setVisibility(!visibility)}
					/>
					<input
						id="photoIn"
						type="photo"
						value={photo}
						style={{
							display: "none",
						}}
						readOnly
					/>
					<CustomPopup
						onClose={popupCloseHandler}
						show={visibility}
						title="Choose a profile photo:"
					>
						<br></br>
						<div></div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile1.PNG?alt=media&token=e01d55ea-c50a-4720-96be-7b7dedf4af8e"
							width="150"
							height="170"
							onClick={(e) =>
								setVisibility(!visibility) +
								setPhoto(
									"https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile1.PNG?alt=media&token=e01d55ea-c50a-4720-96be-7b7dedf4af8e"
								) +
								checkErrors() +
								setSuccess(document.getElementById("photoIn")) +
								setPhoto(e.target.src)
							}
						/>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile2.PNG?alt=media&token=c96ee1b7-7cc0-415c-9c42-4dc19a7d32db"
							width="150"
							height="170"
							onClick={(e) =>
								setVisibility(!visibility) +
								setPhoto(
									"https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile2.PNG?alt=media&token=c96ee1b7-7cc0-415c-9c42-4dc19a7d32db"
								) +
								checkErrors() +
								setSuccess(document.getElementById("photoIn")) +
								setPhoto(e.target.src)
							}
						/>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile3.PNG?alt=media&token=da64a5a6-3edb-4824-9c6a-4f3ac48c1c22"
							width="150"
							height="170"
							onClick={(e) =>
								setVisibility(!visibility) +
								setPhoto(
									"https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/profile3.PNG?alt=media&token=da64a5a6-3edb-4824-9c6a-4f3ac48c1c22"
								) +
								checkErrors() +
								setSuccess(document.getElementById("photoIn")) +
								setPhoto(e.target.src)
							}
						/>
					</CustomPopup>
					<br></br>
					<div
						className="error"
						style={{ display: "block", marginInline: "auto" }}
					></div>
				</div>
				<button type="submit">Sign up</button>
				<br></br>
				<br></br>
				<br></br>
				<h2>Already have an account?</h2>
				<nav>
					<NavLink to="/login">
						<button>Log in</button>
					</NavLink>
				</nav>
			</form>
		</div>
	);
}
