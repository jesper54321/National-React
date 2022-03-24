import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

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
