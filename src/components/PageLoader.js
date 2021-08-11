import { RotateSpinner } from "react-spinners-kit";



export const PageLoader = () => {

	return (
		<div className="">
			<RotateSpinner size={80} color="#fff" loading={true}/>
		</div>
	);
}


