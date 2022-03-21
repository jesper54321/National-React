import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { username, email } from "../../Wrappers/AuthProvider";

export default function Home() {
	return (
		<div>
			<Header />
			<div>
				You registered correctly {username} with email {email}
			</div>
			<Footer />
		</div>
	);
}
