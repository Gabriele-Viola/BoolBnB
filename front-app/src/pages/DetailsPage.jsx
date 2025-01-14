import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import PropertiesCard from "../components/PropertiesCard"

export default function DetailsPage() {

	const { id } = useParams()
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])
	const [nameUser, setNameUser] = useState("")
	const [nights, setNights] = useState("")
	const [review, setReview] = useState("")
	const [emailUser, setEmailUser] = useState("")
	const [textUser, setTextUser] = useState("")


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
			id_property: id,
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


	function HandleSubMessage(e) {
		e.preventDefault()

		const urlPostMessage = "http://localhost:3000/api/message/send"

		const formMessage = {
			id_property: id,
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
		setEmailUser("")
		setTextUser("")
	}

	return (
		<div>
			<div className="container">
				<div className="row my-4 align-items-center">
					<div className="col-6">
						<h1>Property details</h1>
					</div>
					<div className="col-6 text-end">
						<button type="button" className="btn btn-primary">Send Message</button>
					</div>
				</div>
			</div>
			<div className="container">

				<PropertiesCard property={property} services={services} />
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
							<input type="text" id='name' name='name' value={nameUser} onChange={(e) => setNameUser(e.target.value)} className="form-control mb-3" placeholder="Your name" />
							<label htmlFor="nights" className="form-label">Nights</label>
							<input type="number" id="nights" name="nights" value={nights} onChange={(e) => setNights(e.target.value)} className="form-control mb-3" placeholder="Number of nights spent in the property" />
							<label htmlFor="review" className="form-label">Your review</label>
							<textarea className="form-control mb-3" name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Type your review"></textarea>
							<button className="btn btn-primary" type="submit"><i className="bi bi-send-fill"></i> Send</button>
						</form>
					</div>

					<div className="mt-5 p-3 border border-primary-subtle rounded">
						<h3 className="mb-2 text-center">Send your message</h3>
						<form className="newMessage" onSubmit={HandleSubMessage}>
							<label htmlFor="email" className="form-label">Your email</label>
							<input type="email" id='email' name='email' value={emailUser} onChange={(e) => setEmailUser(e.target.value)} className="form-control mb-3" placeholder="Your email address" />
							<label htmlFor="message" className="form-label">Your message</label>
							<textarea className="form-control mb-3" name="message" id="message" value={textUser} onChange={(e) => setTextUser(e.target.value)} placeholder="Your message"></textarea>
							<button className="btn btn-primary" type="submit"><i className="bi bi-send-fill"></i> Send</button>
						</form>
					</div>


				</div>
			</div>
		</div>
	)
}
