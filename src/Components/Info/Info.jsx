import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Info.module.scss";

export default function Info() {
	return (<div className={styles.infoBackground}>
		  
		  <div className={styles.infoPanel}>
		  <h1 className={styles.infoWelcome}>Welcome to our Information screen!</h1>

		  <div >
			<p>Our app is made with a friendly interface, collaborating with the quite popular Google Maps app.</p>
		  	<p>Choose a place over the map of main screen (first icon at the bottom)and, at the place view page, press the Start travel button to open Google Maps with a route to the selected place, and enjoy the travel!</p>
			<p>This app also feature a free Live Chat(second icon at the bottom),messages shown here are sent since the user opened this app.</p>
			<p>Every place contains their own non-live chat, every messqge sent are saved for other user to see.</p>
			<p>Logged user can chat and get their achieved routes saved, so no one gets lost unlike guestg users ;D</p>
		  </div>
			
		  </div>

		
	</div>);
}
