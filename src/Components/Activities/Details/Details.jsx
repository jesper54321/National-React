import React, { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import Comments from "./Comments/Comments";
import { username, email } from "../../../Wrappers/AuthProvider";
import { collection } from "firebase/firestore";
import "./DetailAnimations.scss";

export default function Details() {
	const [Place, setPlace] = useState({});
	useEffect(async () => {
		const placeTemp = (await JSON.parse(sessionStorage.getItem("PLACES")))[0];

		setPlace(placeTemp);
	}, []);

	return (
		<>
			<section className={styles.details}>
				<div className={styles.slider}>
					<div className={styles.images + " slideAnim"}>
						<img src="https://picsum.photos/seed/picsum/1600/900" alt="" />
					</div>
					<div className={styles.pagination}>
						<div className={styles.dot}></div>
						<div className={styles.dot}></div>
						<div className={styles.dot}></div>
						<div className={styles.dot}></div>
						<div className={styles.dot}></div>
					</div>
					<div className={styles.arrows}>
						<div className={styles.left}>&lt;</div>
						<div className={styles.right}>&gt;</div>
					</div>
				</div>
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

			<section className={styles.comments}>
				<div className={styles.chatControl}>
					<textarea
						className={styles.chatMessage}
						placeholder="Write your message here..."
					></textarea>
					<button className={styles.chatSend}>Send</button>
				</div>
				{<Comments />}
			</section>
			{/* {username && email ? (
				<section className={styles.comments}>{<Comments />}</section>
			) : (
				""
			)} */}
		</>
	);
}
