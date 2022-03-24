import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import Comments from "./Comments/Comments";
import { username, email } from "../../../Wrappers/AuthProvider";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { NavLink, useParams } from "react-router-dom";
import { pullDocument } from "../../../Logic/firebase";

export default function Details() {
	let { id } = useParams();
	const [place, setPlace] = useState({});

	useEffect(async () => {
		setPlace(await pullDocument("Places", id));
	}, []);

	return (
		<>
			{place && place.name ? (
				<>
					<section className={styles.details}>
						<Carousel images={place.images} id={id} />
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
			) : (
				<p style={{ margin: "1rem" }}>sry this page doesnt exist</p>
			)}
		</>
	);
}

function Carousel(props) {
	return (
		<AliceCarousel
			autoPlay
			infinite
			autoPlayInterval="3500"
			mouseTracking
			animationDuration="600"
			touchTracking
			disableButtonsControls
		>
			{props.images.map((item) => {
				return (
					<img src={item} alt="" key={props.id} className={styles.sliderimg} />
				);
			})}
		</AliceCarousel>
	);
}
