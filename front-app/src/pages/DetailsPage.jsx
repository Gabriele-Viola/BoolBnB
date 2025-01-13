import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function DetailsPage() {

	const { id } = useParams()
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])
	const [nameUser, setNameUser] = useState("")
	const [nights, setNights] = useState("")
	const [review, setReview] = useState("")


	const urlShow = `http://localhost:3000/api/properties/${id}`
	const urlreviews = `http://localhost:3000/api/${id}/reviews`

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
				setReviews(data.reviews)

			})



	}, [id])

	function HandleSubReview(e) {
		e.preventDefault()
		const userName = e.target.name.value


		const urlPostReview = `http://localhost:3000/api/${id}/${userName}/add-review`
		const formReview = {
			id_property: '1',
			name: userName,
			text_review: e.target.review.value,
			nights: e.target.nights.value
		}

		fetch(urlPostReview, {
			method: "POST",
			body: JSON.stringify(formReview),
			headers: {
				"Content-Type": "application/json"
			}

		}).then(res => res.json())
			.then(data => {
				console.log(data)
			}).catch(err => {
				console.error(err)
			})
		setNameUser("")
		setNights("")
		setReview("")


	}




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
							<div className="row g-3">
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
									<i className="bi bi-rulers"></i>
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
				<div className="reviews">
					<h3>Reviews</h3>
					{reviews.map(review =>
						<div className="card" key={review.id}>
							<div className="card-body">
								<div className="fs-5">{review.text_review}</div>
								<div><span className="text-muted">Nights: </span>{review.nights}</div>
								<span className="text-muted">By: </span>
								{review.name === "" ? <span>Guest</span> : <span>{review.name}</span>}
								<div><span className="text-muted">Date review: </span>{review.date_review.slice(0, 10)}</div>


							</div>
						</div>)}
					<form onSubmit={HandleSubReview}>
						<label htmlFor="name" className="form-label">Name</label>
						<input type="text" id='name' name='name' value={nameUser} onChange={(e) => setNameUser(e.target.value)} className="form-control" />
						<label htmlFor="nights" className="form-label">Nights</label>
						<input type="number" id="nights" name="nights" value={nights} onChange={(e) => setNights(e.target.value)} className="form-control" />
						<label htmlFor="review" className="form-label">Your review</label>
						<textarea className="form-control" name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
						<button className="btn btn-primary" type="submit"><i className="bi bi-send-fill"></i> Send</button>
					</form>

				</div>
			</div>
		</div>
	)
}
