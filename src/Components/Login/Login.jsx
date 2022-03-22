import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { useHistory, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, username } from "../../Wrappers/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseMain from "../../Logic/firebase";
import { SetUser,SetEntry } from "../../Wrappers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
	const notify = () => toast.warning('You got some errors', {
		theme: "dark",
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		newestOnTop:false,
		rtl:false,
		pauseOnFocusLoss:true,
		draggable:true,
		pauseOnHover:true,
	}) + toast.clearWaitingQueue();

	const notify2 = () => toast.error('Wrong password, email or username', {
		theme: "dark",
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		newestOnTop:false,
		rtl:false,
		pauseOnFocusLoss:true,
		draggable:true,
		pauseOnHover:true,
	}) + toast.clearWaitingQueue();

	var emailLogin;
	var usernameLogin;

	var [email, setEmail] = useState("");
	var [password, setPassword] = useState("");

	const navigate = useNavigate();

	var usersData = FirebaseMain();

	const updateNNavigate = async (email) => {
		await SetUser(email);
		await SetEntry(2);
		navigate("/activities/map");
	};

	const setError = (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector("." + styles["error"]);
		errorDisplay.innerText = message;
		inputControl.classList.add(styles["error"]);
		inputControl.classList.remove(styles["success"]);
	};
	const setSuccess = (element) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector("." + styles["error"]);
		errorDisplay.innerText = "";
		inputControl.classList.add(styles["success"]);
		inputControl.classList.remove(styles["error"]);
	};

	var rightPassword = false;
	var rightEmail = false;

	function checkErrors() {
		if (email !== "") {
			setSuccess(document.getElementById("emailIn"));
			rightEmail = true;
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

	const handleSubmit = (e) => {
		e.preventDefault();
		checkErrors();

		if (rightEmail && rightPassword) {
			for (var i = 0; i < usersData.Users.length; i++) {
				if (usersData.Users[i].email === email.toLowerCase()) {
					emailLogin = email.toLowerCase();
					usernameLogin = usersData.Users[i].username;
				}
				if (usersData.Users[i].username === email.toLowerCase()) {
					email = usersData.Users[i].email;

					emailLogin = usersData.Users[i].email;
					usernameLogin = usersData.Users[i].username;
				}
			}
			signInWithEmailAndPassword(auth, email.toLowerCase(), password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					updateNNavigate(email);
				})
				.catch((error) => {
					//document.getElementById("wrong").innerHTML ="Wrong username or password";
					notify2();
					//const errorCode = error.code;
					//const errorMessage = error.message;
				});
		}else{
			notify();
		}
	};

	return (
		<div className={styles["container"]} /*{styles.loginWrapper}*/>
			<ToastContainer limit={2} />
			<form onSubmit={handleSubmit} /*className={styles.loginForm}*/>
				<h1>Log in </h1>

				<div className={styles["input-control"]}>
					<label>Username or email</label>
					<input
						id="emailIn"
						type="text"
						name="email"
						value={email}
						onChange={(event) => setEmail(event.target.value) + checkErrors()}
						onClick={(event) => checkErrors()}
					/>
					<div className={styles["error"]}></div>
				</div>

				<div className={styles["input-control"]}>
					<label>Password</label>
					<input
						id="passwordIn"
						type="password"
						name="password"
						value={password}
						onChange={(event) =>
							setPassword(event.target.value) + checkErrors()
						}
						onClick={(event) => checkErrors()}
					/>
					<div className={styles["error"]}></div>
				</div>
				<div id="wrong" style={{ color: "red" }}></div>
				<div>
					<button>Log in</button>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<div>
					<h2>Don't have an account yet ?</h2>
					<Link to="../Register">
						<button>Register</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
