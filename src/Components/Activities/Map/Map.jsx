import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import tileLayer from "../../../util/tileLayer";
import styles from "./Map.module.scss";
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

const HomeButton = ({ map }) => {
	useMapEvent({
	  dragend() {
		const { lat: latD, lng: lngD } = map.getCenter();
		const { lat, lng } = map.getCenter();
  
		const checkEqualArrays =
		  [lat, lng] !== [latD.toFixed(5) * 1, lngD.toFixed(5) * 1];
  
		document.body.classList[checkEqualArrays ? "add" : "remove"](
		  "show-button-home"
		);
	  },
	});
  
	useEffect(() => {
	  if (!map) return;
  
	  const customControler = L.Control.extend({
		options: {
		  position: "topleft",
		},
  
		onAdd: function () {
		  const btn = L.DomUtil.create("button", "back-to-home");
		  btn.title = "pop rotation";

		  btn.innerHTML =
			'<img src=\'https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/home-start-top-icon-image-flat-home-icon-logo-symbol-sphere-building-transparent-png-400306.png?alt=media&token=3b4f2141-accc-49e9-b4e2-31b088278151\'width=\'25px\' height=\'25px\'>';
  
		  btn.onclick = function () {
			map.flyToBounds([center]);
			document.body.classList.remove("show-button-home");
		  };
  
		  return btn;
		},
	  });
  
	  map.addControl(new customControler());
  
	  const info = L.Control.extend({
		options: {
		  position: "bottomleft",
		},
  
		onAdd: function () {
		  const info = L.DomUtil.create("div", "legend");
		  info.textContent = "move the map";
		  return info;
		},
	  });
  
	  map.addControl(new info());
	}, [map]);
  
	return null;
  };

const content1 = [
	{
		title: "Sukiennice",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg",
		style: { width: "200px" },
		text: "Place 1",
	},
];

const content2 = [
	{
		title: "Sukiennice",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg",
		style: { width: "200px" },
		text: "Place 2",
	},
];

const MapWrapper = () => {
	const [map, setMap] = useState(null);

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
		<div className={styles[MapContainer]} style={{ width: "100%", height: "100%", margin: "0", padding: "0"}}>
		<div  className={styles["grid"]} style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
			<ToastContainer limit={1} />
			<main style={{ position: "absolute", bottom: "0%" }}>
				<MapContainer center={center} zoom={17.2} scrollWheelZoom={false} draggable={true} whenCreated={setMap}
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
					<Marker position={[28.14200, -15.428731]}>
						<Popup maxWidth={200}>
							{content2.map((item, index) => (
								<div key={index}>
									<figure>
										<img src={item.image} alt={item.title} style={item.style} />
									</figure>
									<div>
										{item.text}<br></br>
										<NavLink to="/activities/details/1">Show more</NavLink>
									</div>
								</div>
							))}

						</Popup>
					</Marker>
					<HomeButton map={map} />
				</MapContainer>
			</main>
		</div></div>
	);
};

export default MapWrapper;

export function SetEntry(number) {
	entry = number;
}
