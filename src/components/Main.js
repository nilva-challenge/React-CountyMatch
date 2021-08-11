import axios from "axios";
import { useEffect, useState } from "react";
import { randomSelection } from "../functions/functions_array"
import { MatchCountry } from "./MatchCountry";
import { PageLoader } from './PageLoader'
import Image from './../assets/images/world.png'
import './../assets/sass/style.scss'


export const Main = () => {

	const [country, setCountry] = useState([]);
	const [send, setSend] = useState(false)

	useEffect(() => {
		let allCountries =
			"https://travelbriefing.org/countries.json";

		setSend(false);
		axios.get(allCountries)
			.then(function (response) {
				let random = randomSelection(response.data, 10)
				setCountry([...random])
				setSend(true)
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})

	}, [])



	return (
		<>
			<div className="pic">
				<img src={Image} />
			</div>
			<div className={send ? "" : "loader"}>
				{send
					? <MatchCountry country={country} />
					: <PageLoader />
				}
			</div>
		</>
	);
}


