import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { pullCollection } from "../Logic/firebase";

export default function ActivitiesWrapper() {
	useEffect(async () => {
		const Places = await pullCollection("Places");
		sessionStorage.setItem("PLACES", JSON.stringify(Places));
	}, []);

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
