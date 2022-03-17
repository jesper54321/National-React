import React from "react";
import { Outlet } from "react-router-dom";

export default function ActivitiesWrapper() {
	return (
		<>
			<header></header>
			<Outlet />
			<footer></footer>
		</>
	);
}
