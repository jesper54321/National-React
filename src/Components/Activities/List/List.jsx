import { faRoad } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./List.module.scss";
import { pullCollection } from "../../../Logic/firebase";
import { async } from "@firebase/util";
import { useNavigate } from 'react-router-dom';


const myPlaces = [
	{
		id: 1,
		name: "Fat Frank 1",
		sustainableId: 1
	}, {
		id: 2,
		name: "Fat Frank 2",
		sustainableId: 1
	}, {
		id: 3,
		name: "Fat Frank 3",
		sustainableId: 1
	}, {
		id: 4,
		name: "Fat Frank 4",
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

	
	const navigate = useNavigate();

	const goToOtherPage = (detailId) => {
		console.log("goToOtherPage");
		console.log(detailId);
		navigate(`/activities/details/${detailId}`);
	  }

	return (
		<>
			<div className={styles.listBackground} url="/asset">
				{
					places.map((p) => {

						console.log(p);

						return (

							<div key={p.id} onClick={() => goToOtherPage(p.id)}>
								<div className={styles.listImage}
									style={{ backgroundImage: `url("./places/place-${p.name}.jpg")` }}>
									{/* <img src={`./objectives/objective-${p.sustainableId}.png`} className={styles.objectiveImage} /> */}
									{/* <div className={styles.objectiveImage}
									style={{ backgroundImage: `url("./objectives/objective-${p.sustainableId}.png")` }}></div> */}
								</div>
								<div className={styles.listImageName}>
									<h1>{p.name}</h1>
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


