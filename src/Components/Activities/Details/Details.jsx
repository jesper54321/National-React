import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import Comments from "./Comments/Comments";
import { username, email } from "../../../Wrappers/AuthProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { NavLink, useParams } from "react-router-dom";
import { addDocument } from "../../../Logic/firebase";

const url = "https://picsum.photos/v2/list?limit=10";

export default function Details(props) {
	let { id } = useParams();

	const [place, setPlace] = useState({});
	const [images, setImages] = useState([]);
	useEffect(async () => {
		setPlace(
			...(await JSON.parse(sessionStorage.getItem("PLACES"))).filter(
				(place) => place.id == id
			)
		);
		const imagesTemp = [];
		for (let index = 0; index < 10; index++) {
			imagesTemp.push(
				"https://picsum.photos/seed/picsum" + index + "/1080/608"
			);
		}
		setImages(imagesTemp);
	}, []);
	console.log(place);

	return (
		<>
			<section className={styles.details}>
				<AliceCarousel
					autoPlay
					infinite
					autoPlayInterval="3500"
					mouseTracking
					responsive
					animationDuration="600"
					renderKey="test"
					touchTracking
					disableButtonsControls
				>
					{images?.map((item, index) => {
						return (
							<img
								src={item}
								className={styles["sliderimg"]}
								style={{ width: "100%" }}
								key={item}
							/>
						);
					})}
				</AliceCarousel>
				<h2>{place.name}</h2>
				<article className={styles.sustainable}>
					<h3>Sustainable Goals</h3>
					<p>{place.sustainable}</p>
				</article>
				<article className={styles.information}>
					<h3>Information</h3>
					<p>{place.description}</p>
				</article>
				<a href={place.location} target="_blank">
					Start Route
				</a>
			</section>
			<section className={styles.comments}>
				{username && email ? (
					<Comments id={id} />
				) : (
					<NavLink to="/login">Login to see and write comments</NavLink>
				)}
			</section>
		</>
	);
}
