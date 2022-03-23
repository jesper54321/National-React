import { faRoad } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import styles from "./List.module.scss";
import { pullCollection } from "../../../Logic/firebase";
import { async } from "@firebase/util";


const myPlaces = [
	{
		id: 1,
		name: "Fat Frank",
		sustainableId: 1
	}, {
		id: 2,
		name: "Fat Frank",
		sustainableId: 1
	}, {
		id: 3,
		name: "Fat Frank",
		sustainableId: 1
	}, {
		id: 4,
		name: "Fat Frank",
		sustainableId: 1
	}
];

export default function List(props) {
	// const history = useHistory();

	const [places, setPlaces] = useState([]);
	const [images, setimages] = useState([]);

	useEffect(async () => {
		setPlaces(await pullCollection("Places"));

	}, []);

	function placeDetails(id) {
		props.history.push(`activities/details/${id}`);
	}

	return (
		<>
			<div className={styles.listBackground} url="/asset">

				{
					myPlaces.map((p) => {

						console.log(p);

						return (

							<div key={p.id} onClick={(p) => placeDetails(p.id)}>
								<div className={styles.listImage}
									style={{ backgroundImage: `url("./places/place-${p.id}.jpg")` }}>
									<img src={`./objectives/objective-${p.sustainableId}.png`} className={styles.objectiveImage} />
									{/* <div className={styles.objectiveImage}
									style={{ backgroundImage: `url("./objectives/objective-${p.sustainableId}.png")` }}></div> */}
								</div>
								<div className={styles.listImageName}>
									<h1>Moutain of somewhere</h1>
								</div>
							</div>
						)
					}

					)
				}


			</div>
		</>
	);
}



{/* <div className={styles.listPlaceName}>
					{places.map((items)=>{
						return (<div> 
							{items.name}
						</div>)
				})}	
				</div> */}


