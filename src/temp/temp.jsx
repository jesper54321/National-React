import React from "react";
import { addDocument } from "../Logic/firebase";

export default function Temp() {
	return (
		<form action="">
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Title for the place"
			/>
			<textarea
				name="sustainable"
				id="sustainable"
				placeholder="How they reach a sustainable goal"
			/>
			<textarea
				name="description"
				id="description"
				placeholder="description of the place"
			/>
			<input
				type="text"
				name="location"
				id="location"
				placeholder="the url for the location with google url share"
			/>

			<input
				type="submit"
				value="Create Place"
				onClick={(e) => {
					e.preventDefault();

					const form = e.target.parentNode;

					addDocument("Places", {
						name: form.name.value,
						sustainable: form.sustainable.value,
						description: form.description.value,
						location: form.location.value,
						images: [],
					});

					form.reset();

					alert("submitted the place");

					return false;
				}}
			/>
		</form>
	);
}
