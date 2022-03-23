import { faRoad } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect,useState} from "react";
import styles from "./List.module.scss";
import {pullCollection} from "../../../Logic/firebase";
import { async } from "@firebase/util";


export default function List() {
	
	const [places, setPlaces ] = useState ([]);
	const [images, setimages] = useState([]);

	useEffect( async () => {
		setPlaces(await pullCollection("Places"));

	}, [])
		
	return (
		<div className={styles.listBackground}>
			<div>
				<div className={styles.listImage}>
					<div ></div>
				</div>
				<div className={styles.listImageName}>
						<h1>Moutain of somewhere</h1>
				</div>
			</div>

			<div>
				<div className={styles.listImage}>
					<div ></div>
				</div>
				<div className={styles.listImageName}>
						<h1>Moutain of somewhere</h1>
				</div>
			</div>	
		</div>
	);
}


				
				{/* <div className={styles.listPlaceName}>
					{places.map((items)=>{
						return (<div> 
							{items.name}
						</div>)
				})}	
				</div> */}

		
