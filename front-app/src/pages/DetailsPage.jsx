import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DetailsCard from '../components/DetailsCard'
import ReviewsCard from '../components/ReviewsCard'
import FormAddReview from '../components/FormAddReview'
import FormSendMessage from '../components/FormSendMessage'
import Jumbotron from '../components/Jumbotron'

export default function DetailsPage() {
	const { id } = useParams()
	const [property, setProperty] = useState({})
	const [services, setServices] = useState([])
	const [reviews, setReviews] = useState([])
	const [loading, setLoading] = useState(true)
	const [nameUser, setNameUser] = useState('')
	const [nights, setNights] = useState('')
	const [review, setReview] = useState('')
	const [emailUser, setEmailUser] = useState('') // Email dell'utente
	const [textUser, setTextUser] = useState('')
	const [toName, setToName] = useState('') // Email destinatario
	const [feedback, setFeedback] = useState('')

	const urlShow = `http://localhost:3000/api/properties/${id}`
	const urlreviews = `http://localhost:3000/api/${id}/reviews`

	// Funzione per recuperare le recensioni
	const fetchReviews = async () => {
		try {
			const res = await fetch(urlreviews)
			const data = await res.json()
			setReviews(data.reviews)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const propertyRes = await fetch(urlShow)
				const propertyData = await propertyRes.json()
				setProperty(propertyData.property)
				setServices(propertyData.property.services)
			} catch (err) {
				console.error(err)
			}

			await fetchReviews()
			setLoading(false)
		}

		fetchData()
	}, [id])

	// Gestione invio messaggio
	const HandleSubMessage = async (e) => {
		e.preventDefault()

		const urlPostMessage = 'http://localhost:3000/api/message/send'

		const formMessage = {
			id_property: id,
			email: e.target.email.value, // Email dell'utente
			text_message: e.target.message.value,
			// Email destinatario fissa (email proprietario)
			recipient_email: toName || property.email_owners
		}

		// Controllo email e messaggio
		if (!formMessage.email || !formMessage.text_message) {
			return alert('Tutti i campi sono obbligatori')
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailRegex.test(formMessage.email) || formMessage.email.length > 255) {
			return alert('Formato email non valido')
		}

		if (formMessage.text_message.length < 10 || formMessage.text_message.length > 1000) {
			return alert('Il messaggio deve essere tra 10 e 1000 caratteri')
		}

		try {
			const res = await fetch(urlPostMessage, {
				method: 'POST',
				body: JSON.stringify(formMessage),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const data = await res.json()
			console.log(data)
		} catch (err) {
			console.error(err)
		}

		setEmailUser('')
		setTextUser('')
		setToName('')
	}

	// Funzione per toggle visibilità modulo
	const HandleinputToggle = (item, style) => {
		document.getElementById(item).classList.toggle(style);
	};

	// Se i dati non sono ancora caricati, mostriamo il loading
	if (loading) {
		return <div>Loading...</div>
	}

	const HandleSubReview = async (e) => {
		e.preventDefault();

		const userName = e.target.name.value;
		const urlPostReview = `http://localhost:3000/api/${id}/${userName}/add-review`;

		const formReview = {
			id_property: id,
			name: userName,
			text_review: e.target.review.value,
			nights: e.target.nights.value,
		};
		if (!userName || !nights || !review) {
			return alert('Per favore compila tutti i campi obbligatori');
		}
		if (
			userName.length < 3 ||
			userName.length > 250 ||
			nights < 1 ||
			nights > 255 ||
			review.length < 10 ||
			review.length > 1000
		) {
			return alert('Per favore compila in base alle indicazioni del form');
		}

		try {
			const res = await fetch(urlPostReview, {
				method: 'POST',
				body: JSON.stringify(formReview),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			console.log(data);

			setFeedback(data?.message);

			setReviews(data.reviews);

			setTimeout(() => {
				setFeedback('');
			}, 3000);
		} catch (err) {
			console.error(err);
			setFeedback('Errore nell\'invio della recensione');
		}

		setNameUser('');
		setNights('');
		setReview('');
	};
	return (
		<div>
			<div className="container position-relative">
				<div className="my-4 align-items-center">
					<Jumbotron title={property.name} />
					<div>
						<button type="button" className="btn btn-primary" onClick={() => HandleinputToggle('newMessage', 'd-none')}>
							Invia un messaggio
						</button>
					</div>
				</div>
			</div>

			<div className="container">
				<DetailsCard property={property} services={services} />

				<div className="reviews mt-5">
					<div className="fs-3">{reviews.length} <span className="fs-3">Recensioni</span></div>

					<div className="row g-3">
						<ReviewsCard reviews={reviews} toggle={HandleinputToggle} />
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
				emailUser={emailUser}  // Passa l'email dell'utente
				setEmailUser={setEmailUser}
				textUser={textUser}
				setTextUser={setTextUser}
				fromName={nameUser}
				setFromName={setNameUser}
				toName={toName} // Gestione dell'email destinatario
				setToName={setToName}  // Funzione per impostare l'email destinatario
			/>
		</div>
	)
}
