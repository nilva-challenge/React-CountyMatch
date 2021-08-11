import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export const CardData = ({ color, data, icon, title, classStyle, footData, footer }) => {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		if(data.type == 1 && !data.match.length){
			setShow(false);
		}
		else{
			setShow(true);
		}
		
	}


	if (typeof data === 'undefined' || typeof data === 'null') {
		return null;
	}

	return (

		<div className={classStyle}>
			<div className={"card order-card" + ` bg-c-${color}`} onClick={handleShow}>
				<div className="card-block">
					<h6 className="mb-3">{title}</h6>
					<i className={"fa f-left" + ` fa-${icon}`}></i>
					<h2 className="text-right"><span>
						{data == null ? 0 : data.match.length}
						{/* {console.log(title, data['match'], data.col)} */}
					</span></h2>
					<p className="mb-0">{data == null ? "" : data.footer}<span className="f-right">{(data == null ? "" : data.footData)}</span></p>
				</div>
			</div>
			<Modal show={show} onHide={handleClose} centered size={"lg"}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<table class="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								{
									data.col.map((val) =>
										<th scope="col">{val}</th>
									)
								}
							</tr>
						</thead>
						<tbody>
							{data.type == 1 ?
								!data.match.length ?
									<div><i class="fa fa-eye-slash fa-6" aria-hidden="true"></i></div>
									:
									data.match.map((val, index) =>
										<tr>
											<th scope="row">{index + 1}</th>
											<td>{val.item1}</td>
											<td>{val.item2}</td>
											<td>{val.timezone}</td>
										</tr>
									)
								:
								data.match.map((val, index) =>
									<tr>
										<th scope="row">{index + 1}</th>
										<td>{val.name}</td>
										<td>{val.languages.length ? val.languages[0].language : 0}</td>
										<td>{val.timezone}</td>
									</tr>
								)
							}

						</tbody>
					</table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>

	);
}


