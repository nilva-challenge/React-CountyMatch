import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from "@material-ui/core/Avatar";
import Zoom from "@material-ui/core/Zoom";


const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip);


export const FlagCountry = ({ data , show}) => {


	return (
		<Zoom
			in={show}
			style={{ transitionDelay: show ? data.delay : "0ms" }}
		>
			<div className="card-country col-sm-3 col-auto col-md-2">
				<LightTooltip title={data.name} placement={"right"} enterDelay={500}>
					<Avatar className={"avatar-logo"} alt={data.name} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.iso}.svg`} />
				</LightTooltip>
				<p className="my-2" >{(data.name.length > 10 ? data.name.substr(0, 10) + '...' : data.name)}</p>
			</div>
		</Zoom>
	);
}


