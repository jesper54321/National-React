import React, { useState, useEffect } from "react";
//import styles from "./Login.module.scss";
//import "../Register/Register.scss";
import { useHistory, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, username } from "../../Wrappers/AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseMain from "../../Logic/firebase";
import { SetUser } from "../../Wrappers/AuthProvider";

export default function Login() {
	var emailLogin;
	var usernameLogin;

	var [email, setEmail] = useState("");
	var [password, setPassword] = useState("");

	const navigate = useNavigate();

	var usersData = FirebaseMain();

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

					//console.log("login successfuly");

					SetUser(usernameLogin, emailLogin);

					navigate("/activities/map");
				})
				.catch((error) => {
					document.getElementById("wrong").innerHTML = "Wrong username or password";
					//const errorCode = error.code;
					//const errorMessage = error.message;
				});
		}
	};

	const validate = (values) => {
		const errors = {};
		//const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

		if (!values.email) {
			errors.email = "Email or username are required!";
		}
		if (!values.password) {
			errors.password = "Password is required!";
		} else if (values.password.length < 6) {
			errors.password = "Password must be more than 6 caracters";
		}

		return errors;
	};
	return (
		<div className="container"/*{styles.loginWrapper}*/>
			<form onSubmit={handleSubmit} /*className={styles.loginForm}*/ >
				<h1>Log in </h1>

				<div className="input-control">
					<label>Username or email</label>
					<input
						id="emailIn"
						type="text"
						name="email"
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
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value) + checkErrors()}
						onClick={(event) => checkErrors()}
					/>
					<div className="error"></div>
				</div>
				<div id="wrong" style={{ color: 'red' }}></div>
				<div>
					<button>Log in</button>
				</div>
				<br></br><br></br><br></br>
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
