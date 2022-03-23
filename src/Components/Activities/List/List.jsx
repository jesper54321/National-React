import { faRoad } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect,useState} from "react";
import styles from "./List.module.scss";
import {pullCollection} from "../../../Logic/firebase";
import { async } from "@firebase/util";




export default function List() {
	
	const [places, setPlaces ] = useState ([]);

	useEffect( async () => {
		//documentArrayD = await pullCollection("Places");
		setPlaces(await pullCollection("Places"));
	}, [])
		

		
	
	
	

	return (
		<div className={styles.listBackground}>

			<div>
				<div className={styles.listImage}>
					
					<div ></div>
				</div>
				
				<div className={styles.listPlaceName}>
					{places.map((items)=>{
						return (<div> 
							{items.name}
						</div>)
				})}	
				</div>

				
				<div className={styles.listPlaceDescription}>
					{places.map((items)=>{
						return (<div> 
							{items.description}
						</div>)
					})}	
				</div>
			</div>
			<div>
				
			</div>
			
			
		</div>
	);
}
