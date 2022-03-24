import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import tileLayer from "../../../util/tileLayer";
import styles from "./Map.module.scss";
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const start=[28.13667, -15.43717];
const center = [28.13667, -15.43717];

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
					map.flyTo(center, 13);
					document.body.classList.remove("show-button-home");
				};

				map.flyTo(center, 13);
					document.body.classList.remove("show-button-home");
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

const content1 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/c%C3%A1ritas.PNG?alt=media&token=6b30fe2c-c5ac-44e0-a28e-b2201d329ed1",
	style: { width: "200px" }, text: "Cáritas Diocesana",
},];

const content2 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/image001.webp?alt=media&token=80ef2399-2626-4d50-9b93-0a268ed30c99",
	style: { width: "200px" }, text: "Fat Frank",
},];

const content3 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/museo-elder.jpg?alt=media&token=37afb299-622e-43a0-abb4-d53f8b4d2e9f",
	style: { width: "200px" }, text: "Elder Museum",
},];

const content4 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/Hospital-Negrin.jpg?alt=media&token=8fdebf45-138c-42d3-a925-a5e60ef65f99",
	style: { width: "200px" }, text: "Universitary Hospital Dr Negrín",
},]; 

const content5 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/puerto%20de%20la%20luz.jpg?alt=media&token=5ba91d5b-b750-4dea-9f49-94d3acc8f1e7",
	style: { width: "200px" }, text: "Port of the Light",
},];

const content6 = [{
	image: "https://firebasestorage.googleapis.com/v0/b/national-react-app.appspot.com/o/Juicyavenue3.jpg?alt=media&token=eb0ac625-67a7-4653-ab59-eb8a11cc99ed",
	style: { width: "200px" }, text: "Juicy Avenue",
},];

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
		<div className={styles[MapContainer]} style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
			<div className={styles["grid"]} style={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
				<ToastContainer limit={1} />
				<main style={{ position: "absolute", bottom: "0%" }}>
					<MapContainer center={center} zoom={3} scrollWheelZoom={false} draggable={true} whenCreated={setMap}
						style={{ width: "100%", height: "100%", margin: "auto" }}>
						<TileLayer {...tileLayer} />
						<Marker position={[28.120581, -15.436515]}>
							<Popup maxWidth={200}>
								{content1.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/0">Show more</NavLink>
										</div>
									</div>
								))}

							</Popup>
						</Marker>
						<Marker position={[28.137233, -15.43541]}>
							<Popup maxWidth={200}>
								{content2.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/1">Show more</NavLink>
										</div>
									</div>
								))}
							</Popup>
						</Marker>
						<Marker position={[28.141046, -15.429611]}>
							<Popup maxWidth={200}>
								{content3.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/2">Show more</NavLink>
										</div>
									</div>
								))}
							</Popup>
						</Marker>
						<Marker position={[28.12046, -15.444438]}>
							<Popup maxWidth={200}>
								{content4.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/3">Show more</NavLink>
										</div>
									</div>
								))}
							</Popup>
						</Marker>
						<Marker position={[28.145114, -15.416136]}>
							<Popup maxWidth={200}>
								{content5.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/3">Show more</NavLink>
										</div>
									</div>
								))}
							</Popup>
						</Marker>
						<Marker position={[28.144936, -15.430845]}>
							<Popup maxWidth={200}>
								{content6.map((item, index) => (
									<div key={index}>
										<figure>
											<img src={item.image} alt={item.title} style={item.style} />
										</figure>
										<div>
											<h1>{item.text}</h1><br></br>
											<NavLink to="/activities/details/4">Show more</NavLink>
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
