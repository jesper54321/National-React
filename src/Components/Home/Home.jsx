import React from "react";
<<<<<<< HEAD

export default function Home() {
	return <div>Home</div>;
=======
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { username,email } from "../../Wrappers/AuthProvider";

export default function Home() {
	return <div>
		<Header/>
			<div>You registered correctly {username} with email {email}</div>
		<Footer/>
	</div>;
>>>>>>> b4ac48a96703b5a1f97a871758ed793122bea4b7
}
