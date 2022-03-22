import React from "react";
import "./Contact.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Contact() {
	return  <div className="contact-background">
		<div className="contact-panel">
			<h1 className="contact-welcome">Welcome to our Contact page!</h1>
			<h6 className="contact-subtitle">Any question sent will be answered as soon as possible through one of the following ways of contact. Press on one to contact us and let us try to fix all your problems! (Those related to the App though ;D)</h6>

			<div>
				<button type="button" className="contact-button" >
					<span className="contact-button-text">projectnAME@nAME.org</span>
				</button>
			</div>
			<button type="button" className="contact-button" >
				<span className="contact-button-text">+34 333 666 999</span>
			</button>

			<br /><br /><br />

			<button type="button" className="contact-button" >
				<span className="contact-button-text">twittProjectnAME</span>
			</button>
			<div>
				<button type="button" className="contact-button" >
					<span className="contact-button-text">facebProjectnAME</span>
				</button>
			</div>
			<button type="button" className="contact-button" >
				<span className="contact-button-text">InstaProjectnAME</span>
			</button>
			
			<br /><br /><br /><br />

			<span className="contact-end-note">We would kindly appreciate patience, thank you very much ;D</span>

		</div>
		
	</div>;
}
