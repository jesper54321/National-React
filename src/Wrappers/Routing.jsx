import React from "react";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import ActivitiesWrapper from "./ActivitiesWrapper";
import LoginWrapper from "./LoginWrapper";
import Home from "../Components/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Info from "../Components/Info/Info";
import Contact from "../Components/Contact/Contact";
import List from "../Components/Activities/List/List";
import Map from "../Components/Activities/Map/Map";
import Details from "../Components/Activities/Details/Details";
import Chat from "../Components/Chat/Chat";
import FirebaseMain from "../Logic/firebase";

export default function Routing() {
	return (
		<Router>
			<Routes>
				<Route path="test" element={<FirebaseMain />} />
				<Route path="activities" element={<ActivitiesWrapper />}>
					<Route index element={<List />} />
					<Route path="map" element={<Map />} />
					<Route path="details/:id" element={<Details />} />
					<Route path="info" element={<Info />} />
					<Route path="contact" element={<Contact />} />
					<Route path="chat" element={<Chat />} />
				</Route>
				<Route path="/" element={<LoginWrapper />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="home" element={<Home />} />
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</Router>
	);
}
