import axios from "axios";
import { useEffect, useState } from "react";
import Grow from '@material-ui/core/Grow';
import { RotateSpinner } from "react-spinners-kit";
import { CardData } from './CardData'
import { kindOf, allItemUnique } from "../functions/functions_array"
import { findNotMatch, findMatch } from "../functions/functions_match"
import { FlagCountry } from './FlagCountry'



export const MatchCountry = ({ country }) => {

	const [flags, setFlags] = useState([]);
	const [data, setData] = useState([]);
	const [noMutal, setNoMutal] = useState({});
	const [match, setMatchCountry] = useState({});
	const [show, setShow] = useState(false)
	const [showData, setShowData] = useState(false)

	useEffect(() => {
		let requests = [];
		let res = [];
		let isos = [];
		let optimize = [];
		for (var i = 0; i < country.length; i++) {
			requests.push(axios.get(country[i].url))
		}

		axios
			.all(requests)
			.then(
				axios.spread((...responses) => {
					for (var i = 0; i < responses.length; i++) {
						const responseOne = responses[i];
						isos.push({ name: responseOne.data.names.name, iso: responseOne.data.names.iso2, delay: `${i * 500}ms` })
						let timezone = responseOne.data.timezone.name.split('/')[0]
						res.push({ name: responseOne.data.names, neighbors: responseOne.data.neighbors, timezone })
						optimize.push({ key: i + 1, languages: responseOne.data.language, name: responseOne.data.names.full, timezone: responseOne.data.timezone.name })
					}
					setFlags(isos)
					setData(responses)

					let tmp_match = findMatch(res);
					let tmp_not_match = findNotMatch(res, optimize)

					let match_card = { type: 1, match: tmp_match, title: 'Pairs of neighboring', footer: 'Diversity of continents', footData: kindOf(tmp_match, 'timezone').length, col: ['country one', 'country two', 'timezone'] }
					let not_match_card = { type: 2, match: tmp_not_match, title: 'no Mutual Country', footer: 'Diversity of continents', footData: kindOf(tmp_match, 'timezone').length, col: ['name', 'languages', 'timezone'] }


					setShow(true);
					setMatchCountry(match_card);
					setNoMutal(not_match_card)

					// console.log(optimize)

					setTimeout(() => setShowData(true), 11 * 500)
				})
			)
			.catch(errors => {
				console.error(errors);
			});

	}, [country])





	return (
		<>
			<h3 className="m-4 text-center" style={{ color: 'white' }}>SELECTED COUNTRIES</h3>
			<div className="w-100">
				<div className="in-row">
					{!show
						? <div className={"mx-auto my-3"}><RotateSpinner size={50} color="#fff" loading={true} /></div>
						: flags.map((val) => {
							return (
								<FlagCountry  data={val} show/>
							)
						})
					}

				</div>
			</div>
			{
				showData
					?
					<Grow 
						in={showData}
					>
						<div className="">
							<h3 className="m-4 text-center" style={{ color: 'white' }}>data country</h3>
							<div class="container">
								<div class="in-row">
									<CardData color="yellow" icon="arrows-alt" classStyle={"col-md-4 col-xl-3"} data={match} title={match.title} />
									<CardData color="green" icon="rocket" classStyle={"col-md-4 col-xl-3"} />
									<CardData color="pink" icon="times  " classStyle={"col-md-4 col-xl-3"} data={noMutal} title={noMutal.title} />
								</div>
							</div>
						</div>
					</Grow >
					: null
			}

		</>
	);
}

