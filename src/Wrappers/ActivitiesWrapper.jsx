import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { pullCollection, pullImages } from "../Logic/firebase";

export default function ActivitiesWrapper() {
	const [places, setPlaces] = useState([]);
	useEffect(async () => {
		const placesT = await pullCollection("Places");

		for (const item in placesT) {
			placesT[item].images = await pullImages(placesT[item].id);
		}
		setPlaces(await placesT);
	}, []);

	if (places.length > 0)
		sessionStorage.setItem("PLACES", JSON.stringify(places));

	return (
		<>
			<Header />
			<section className="activityWrapper">
				<Outlet />
			</section>
			<Footer />
		</>
	);
}
