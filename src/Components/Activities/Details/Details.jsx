import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import Comments from "./Comments/Comments";
import { username, email } from "../../../Wrappers/AuthProvider";
import { collection, serverTimestamp } from "firebase/firestore";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useParams } from "react-router-dom";
import { addDocument } from "../../../Logic/firebase";

const url = "https://picsum.photos/v2/list?limit=10";

export default function Details(props) {
	let { id } = useParams();

	const [Place, setPlace] = useState({});
	const [images, setimages] = useState([]);
	useEffect(async () => {
		const placeTemp = (await JSON.parse(sessionStorage.getItem("PLACES")))[0];
		const imagesTemp = [];
		for (let index = 0; index < 10; index++) {
			imagesTemp.push(
				"https://picsum.photos/seed/picsum" + index + "/1080/608"
			);
		}
		setimages(imagesTemp);
		setPlace(placeTemp);
	}, []);

	return (
		<>
			<section className={styles.details}>
				<AliceCarousel
					autoPlay
					infinite
					autoPlayInterval="3500"
					mouseTracking
					responsive
					animationDuration="600"
					renderKey="test"
					touchTracking
					disableButtonsControls
				>
					{images?.map((item, index) => {
						return (
							<img
								src={item}
								className={styles["sliderimg"]}
								style={{ width: "100%" }}
								key={item}
							/>
						);
					})}
				</AliceCarousel>
				<article className={styles.sustainable}>
					<h3>Sustainable Goals</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
						reiciendis adipisci ipsum asperiores labore perspiciatis in minima
						provident, corrupti rem incidunt libero repellendus voluptatum vero
						soluta veniam. Odit recusandae nihil explicabo eveniet et laboriosam
						delectus officiis deserunt doloribus natus non velit ab amet,
						consectetur neque dignissimos. Enim velit tempora nesciunt!
					</p>
				</article>
				<article className={styles.information}>
					<h3>Information</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
						maxime molestiae perferendis ipsa nam praesentium fuga autem,
						dolorem quos ducimus iusto culpa modi odio deleniti? Tempore quis
						qui, eos est quia quaerat adipisci error vero quas cumque sequi
						placeat excepturi. Rem dicta debitis earum enim dolor quia quam
						voluptatum aperiam, pariatur veritatis aliquid ipsam laboriosam sit
						itaque ut omnis repellat non temporibus adipisci dolores? Facere
						dicta quia commodi quis nesciunt distinctio, velit dolorum
						excepturi. Saepe unde inventore nostrum iure possimus blanditiis,
						dolor officiis accusamus sapiente, facilis quod! Eligendi
						repudiandae vitae ratione itaque atque culpa eveniet laudantium
						dolores a sit incidunt, magni nemo consequatur temporibus magnam
						quae et aspernatur optio amet, deleniti ex accusamus? Dolor facilis
						laudantium, neque enim atque aspernatur similique explicabo incidunt
						itaque quasi nam non sunt optio pariatur repudiandae ipsam quam sint
						quas maiores adipisci facere numquam ducimus porro reprehenderit. Ad
						dicta facilis delectus consequatur itaque impedit suscipit
						exercitationem fugit, voluptates laborum vero praesentium rem
						architecto temporibus. Dolores maxime maiores, eum fugiat impedit
						sunt quo voluptatem harum adipisci nemo! Ipsa cumque eius vel itaque
						voluptatibus placeat ullam corporis. Beatae odit perspiciatis sed
						dolor id, omnis aspernatur dicta itaque recusandae quibusdam nostrum
						sequi voluptatum sapiente impedit consequuntur officiis aperiam?
					</p>
				</article>
				<a href={""} target="_blank">
					Start Route
				</a>
			</section>

			<section className={styles.comments}>{<Comments id={id} />}</section>
			{/* {username && email ? (
				<section className={styles.comments}>{<Comments />}</section>
			) : (
				""
			)} */}
		</>
	);
}
