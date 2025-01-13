import { data, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function DetailsPage() {

	//const { id } = useParams()
	//console.log(id)
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])

	const urlShow = "http://localhost:3000/api/properties/1"
	const urlreviews = "http://localhost:3000/api/1/reviews"
	useEffect(() => {

		fetch(urlShow)
			.then((res => res.json()))
			.then(data => {
				setProperty(data.property)
				setServices(data.property.services)
			}).catch(err => console.error(err))

		fetch(urlreviews)
			.then(res => res.json())
			.then(data => {
				console.log(data);

			})



	}, [])




	return (
		<div>

			<h1>Property details</h1>
			<div className="container">
				<div className="card">
					<div className="card-img-top"></div>
					<div className="card-body">
						<div className="card-title">
							{property.name}
						</div>
						<div>
							<h3>
								property features
							</h3>
							<div className="row">
								<div className="col-4">
									<strong>Rooms: </strong>
									<span>{property.rooms}</span>
								</div>
								<div className="col-4">
									<strong>Beds: </strong>
									<span>{property.beds}</span>
								</div>
								<div className="col-4">
									<strong>Bathrooms: </strong>
									<span>{property.bathrooms}</span>
								</div>
								<div className="col-4">
									<i className="bi bi-border-all"></i>
									{property.mq}
								</div>
								<div className="col-4">
									<i className="bi bi-geo-alt"></i>
									{property.address}
								</div>
								<div className="col-4">
									<i className="bi bi-envelope"></i>
									{property.email_owners}
								</div>
								<div className="col-4">
									<i className="bi bi-heart"></i>
									{property.like}
								</div>
								<div className="col-4">
									<i className="bi bi-tools"></i>
									{services.join(", ")}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
