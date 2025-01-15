import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DetailsCard from '../components/DetailsCard'
import ReviewsCard from '../components/ReviewsCard'
import FormAddReview from '../components/FormAddReview'
import FormSendMessage from '../components/FormSendMessage'

export default function DetailsPage() {
	const { id } = useParams()
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])
	const [nameUser, setNameUser] = useState('')
	const [nights, setNights] = useState('')
	const [review, setReview] = useState('')
	const [emailUser, setEmailUser] = useState('')
	const [textUser, setTextUser] = useState('')
	const [feedback, setFeedback] = useState('')

	const urlShow = `http://localhost:3000/api/properties/${id}`
	const urlreviews = `http://localhost:3000/api/${id}/reviews`

	function fetchReviews() {
		fetch(urlreviews)
			.then((res) => res.json())
			.then((data) => {
				setReviews(data.reviews)
			})
			.catch((err) => {
				console.error(err)
			})
	}
	useEffect(() => {
		fetch(urlShow)
			.then((res) => res.json())
			.then((data) => {
				setProperty(data.property)
				setServices(data.property.services)
			})
			.catch((err) => console.error(err))

		fetchReviews()
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
			method: 'POST',
			body: JSON.stringify(formReview),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setFeedback('Your review has been sent!')
				fetchReviews()
				setTimeout(() => {
					setFeedback('')
				}, 3000)
			})
			.catch((err) => {
				console.error(err)
				setFeedback('Error sending your review')
			})
		setNameUser('')
		setNights('')
		setReview('')
	}

	function HandleSubMessage(e) {
		e.preventDefault()

		const urlPostMessage = 'http://localhost:3000/api/message/send'

		const formMessage = {
			id_property: id,
			email: e.target.email.value,
			text_message: e.target.message.value
		}

		fetch(urlPostMessage, {
			method: 'POST',
			body: JSON.stringify(formMessage),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
			})
			.catch((err) => {
				console.error(err)
			})
		setEmailUser('')
		setTextUser('')
	}

	function HandleinputToggle(item) {
		document.getElementById(item).classList.toggle('d-none')
	}

	return (
		<div>
			<div className="container position-relative">
				<div className="row my-4 align-items-center">
					<div className="col-6">
						<h1>Dettagli della proprietà</h1>
					</div>
					<div className="col-6 text-end">
						<button type="button" className="btn btn-primary" onClick={() => HandleinputToggle('newMessage')}>
							Invia un messaggio
						</button>
					</div>
				</div>
			</div>
			<div className="container">
				<DetailsCard property={property} services={services} />
				<div className="reviews mt-5">
					<h3>Recensioni</h3>
					<div className="row g-3">
						<ReviewsCard reviews={reviews} />
						<div>{feedback && <div className="alert alert-success mt-3">{feedback}</div>}</div>
					</div>

					<FormAddReview
						HandleSubReview={HandleSubReview}
						nameUser={nameUser}
						setNameUser={setNameUser}
						nights={nights}
						setNights={setNights}
						review={review}
						setReview={setReview}
					/>
				</div>
			</div>
			<FormSendMessage
				HandleinputToggle={HandleinputToggle}
				HandleSubMessage={HandleSubMessage}
				emailUser={emailUser}
				setEmailUser={setEmailUser}
				textUser={textUser}
				setTextUser={setTextUser}
			/>
		</div>
	)
}
