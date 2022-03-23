import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { getPlaces } from "../Logic/firebase";

export default function ActivitiesWrapper() {
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
