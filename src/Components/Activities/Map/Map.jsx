import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import tileLayer from "../../../util/tileLayer";
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-tabs/style/react-tabs.css";
import { NavLink } from "react-router-dom";

const notifyRegister = () => toast.success('You registered successfully', {
	theme: "dark",
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	progress: undefined,
	newestOnTop: false,
	rtl: false,
}) + toast.clearWaitingQueue();

const notifyLogin = () => toast.success('You logged in correctly', {
	theme: "dark",
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	progress: undefined,
	newestOnTop: false,
	rtl: false,
}) + toast.clearWaitingQueue();


var entry = 0;


const center = [28.140705, -15.428731];

const content1 = [
	{
		title: "Sukiennice",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg",
		style: { width: "200px" },
		text: "Place 1",
		link: "https://en.wikipedia.org/wiki/Krak%C3%B3w",
	},
];

const MapWrapper = () => {
	React.useEffect(() => {
		const L = require("leaflet");

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
			iconUrl: require("leaflet/dist/images/marker-icon.png"),
			shadowUrl: require("leaflet/dist/images/marker-shadow.png")
		});
	}, []);

	if (entry === 1) {
		entry = 0;
		setTimeout(() => { notifyRegister(); }, 1000);
	} else if (entry === 2) {
		entry = 0;
		setTimeout(() => { notifyLogin(); }, 1000);
	}

	return (
		<div className="grid" style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
			<ToastContainer limit={1} />
			<main style={{ position: "absolute", bottom: "0%" }}>
				<MapContainer center={center} zoom={17.2} scrollWheelZoom={false} draggable={true}
					style={{ width: "100%", height: "100%", margin: "auto", borderStyle: "solid", borderWidth: "2px" }}>
					<TileLayer {...tileLayer} />
					<Marker position={center}>
						<Popup maxWidth={200}>
							{content1.map((item, index) => (
								<div key={index}>
									<figure>
										<img src={item.image} alt={item.title} style={item.style} />
									</figure>
									<div>
										{item.text}<br></br>
										<NavLink to="/activities/details/0">Show more</NavLink>
									</div>
								</div>
							))}

						</Popup>
					</Marker>
				</MapContainer>
			</main>
		</div>
	);
};

export default MapWrapper;

export function SetEntry(number) {
	entry = number;
}
