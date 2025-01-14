import { data, Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function DetailsPage() {

	//const { id } = useParams()
	//console.log(id)
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])

	const [formReview, setFormReview] = useState({ name: "", nights: "", review: "" })
	const [formMessage, setFormMessage] = useState({ email: "", message: "" })

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
				setReviews(data.reviews)
			})
	}, [reviews])

	function HandleSubReview(e) {
		e.preventDefault()
		const userName = e.target.name.value

		const urlPostReview = `http://localhost:3000/api/1/${userName}/add-review`
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
	}

	function HandleSubMessage(e) {
		e.preventDefault()

		const urlPostMessage = "http://localhost:3000/api/message/send"

		const formMessage = {
			id_property: '1',
			email: e.target.email.value,
			text_message: e.target.message.value
		}

		fetch(urlPostMessage, {
			method: "POST",
			body: JSON.stringify(formMessage),
			headers: {
				"Content-Type": "application/json"
			}

		}).then(res => res.json())
			.then(data => {
				console.log(data)
			}).catch(err => {
				console.error(err)
			})
	}

	return (
		<div>
			<div className="container">
				<div className="row my-4 align-items-center">
					<div className="col-6">
						<h1>Property details</h1>
					</div>
					<div className="col-3">
						<button type="button" className="btn btn-primary">Send Message</button>
					</div>
					<div className="col-3">
						<button type="button" className="btn btn-primary justify-self-end">Leave your review</button>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="card">
					<div className="card-img-top"></div>
					<div className="card-body">
						<div className="card-title mb-2 text-center">
							<h2>{property.name}</h2>
						</div>
						<div>
							<h4>
								Property Features:
							</h4>
							<div className="row mt-2 g-3">
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
									<i className="bi bi-rulers"> </i>
									{property.mq}
								</div>
								<div className="col-4">
									<i className="bi bi-geo-alt"> </i>
									{property.address}
								</div>
								<div className="col-4">
									<i className="bi bi-envelope"> </i>
									{property.email_owners}
								</div>
								<div className="col-4">
									<i className="bi bi-heart"> </i>
									{property.like}
								</div>
								<div className="col-4">
									<i className="bi bi-tools"> </i>
									{services.join(", ")}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="reviews mt-5">
					<h3>Reviews</h3>
					{reviews.map(review =>
						<div className="card my-3" key={review.id}>
							<div className="card-body">
								<div className="fs-5">{review.text_review}</div>
								<div><span className="text-muted">Nights: </span>{review.nights}</div>
								<span className="text-muted">By: </span>
								{review.name === "" ? <span>Guest</span> : <span>{review.name}</span>}
								<div><span className="text-muted">Date review: </span>{review.date_review.slice(0, 10)}</div>
							</div>
						</div>)}

					<div className="mt-5 p-3 border border-primary-subtle rounded">
						<h3 className="mb-2 text-center">Leave your review</h3>
						<form className="newReview" onSubmit={HandleSubReview}>
							<label htmlFor="name" className="form-label">Name</label>
							<input type="text" id='name' name='name' className="form-control mb-3" placeholder="Your name" />
							<label htmlFor="nights" className="form-label">Nights</label>
							<input type="number" id="nights" name="nights" className="form-control mb-3" placeholder="Number of nights spent in the property" />
							<label htmlFor="review" className="form-label">Your review</label>
							<textarea className="form-control mb-3" name="review" id="review" placeholder="Type your review"></textarea>
							<button className="btn btn-primary" type="submit"><i className="bi bi-send-fill"></i> Send</button>
						</form>
					</div>

					<div className="mt-5 p-3 border border-primary-subtle rounded">
						<h3 className="mb-2 text-center">Send your message</h3>
						<form className="newMessage" onSubmit={HandleSubMessage}>
							<label htmlFor="email" className="form-label">Your email</label>
							<input type="email" id='email' name='email' className="form-control mb-3" placeholder="Your email address" />
							<label htmlFor="message" className="form-label">Your message</label>
							<textarea className="form-control mb-3" name="message" id="message" placeholder="Your message"></textarea>
							<button className="btn btn-primary" type="submit"><i className="bi bi-send-fill"></i> Send</button>
						</form>
					</div>

				</div>
			</div>
		</div>
	)
}
