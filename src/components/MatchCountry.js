import axios from "axios";
import { useEffect, useState } from "react";



export const MatchCountry = ({ country }) => {

	const[flags, setFlags] = useState([]);

	useEffect(() => {
		let requests = [];
		let isos = []
		for (var i = 0; i < country.length; i++) {
			requests.push(axios.get(country[i].url))
		}

		axios
			.all(requests)
			.then(
				axios.spread((...responses) => {
					for (var i = 0; i < responses.length; i++) {
						const responseOne = responses[i];
						isos.push({name:responseOne.data.names.name, iso:responseOne.data.names.iso2})
						
						// console.log({ name: responseOne, neighbors: responseOne.data.neighbors });
					}
					console.log(isos)
					setFlags(isos)
				})
			)
			.catch(errors => {
				// react on errors.
				console.error(errors);
			});

	}, [country])



	return (
		<div className="">
			{flags.map((val)=>{
				return(
					<div style={{display:'flex', justifyContent:'center'}}>
						<img src={`https://www.countryflags.io/be/${val.name}/64.png`} />
						<img style={{width:'120px', height:'120px'}} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${val.iso}.svg`} />
					</div>
				)
			})}
			
			
		</div>
	);
}

