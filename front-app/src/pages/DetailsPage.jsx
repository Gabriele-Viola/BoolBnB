import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailsCard from '../components/DetailsCard';
import ReviewsCard from '../components/ReviewsCard';
import FormAddReview from '../components/FormAddReview';
import FormSendMessage from '../components/FormSendMessage';

export default function DetailsPage() {
	const { id } = useParams();
	const [property, setProperty] = useState({});
	const [services, setServices] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);  // Aggiungi lo stato di caricamento
	const [nameUser, setNameUser] = useState('');
	const [nights, setNights] = useState('');
	const [review, setReview] = useState('');
	const [emailUser, setEmailUser] = useState('');
	const [textUser, setTextUser] = useState('');
	const [feedback, setFeedback] = useState('');

	const urlShow = `http://localhost:3000/api/properties/${id}`;
	const urlreviews = `http://localhost:3000/api/${id}/reviews`;

	// Funzione per recuperare le recensioni
	const fetchReviews = async () => {
		try {
			const res = await fetch(urlreviews);
			const data = await res.json();
			setReviews(data.reviews);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const propertyRes = await fetch(urlShow);
				const propertyData = await propertyRes.json();
				setProperty(propertyData.property);
				setServices(propertyData.property.services);
			} catch (err) {
				console.error(err);
			}

			await fetchReviews(); // Carica le recensioni all'inizio
			setLoading(false); // Imposta lo stato di caricamento su false quando i dati sono pronti
		};

		fetchData();
	}, [id]);

	// Gestione invio recensione
	const HandleSubReview = async (e) => {
		e.preventDefault();

		const userName = e.target.name.value;
		const urlPostReview = `http://localhost:3000/api/${id}/${userName}/add-review`;

		const formReview = {
			id_property: id,
			name: userName,
			text_review: e.target.review.value,
			nights: e.target.nights.value
		};

		try {
			const res = await fetch(urlPostReview, {
				method: 'POST',
				body: JSON.stringify(formReview),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			console.log(data);

			setFeedback('Your review has been sent!');

			// Aggiungi la recensione localmente senza fare una nuova richiesta
			setReviews((prevReviews) => [...prevReviews, formReview]);

			setTimeout(() => {
				setFeedback('');
			}, 3000);
		} catch (err) {
			console.error(err);
			setFeedback('Error sending your review');
		}

		setNameUser('');
		setNights('');
		setReview('');
	};

	// Gestione invio messaggio
	const HandleSubMessage = async (e) => {
		e.preventDefault();

		const urlPostMessage = 'http://localhost:3000/api/message/send';

		const formMessage = {
			id_property: id,
			email: e.target.email.value,
			text_message: e.target.message.value
		};

		try {
			const res = await fetch(urlPostMessage, {
				method: 'POST',
				body: JSON.stringify(formMessage),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}

		setEmailUser('');
		setTextUser('');
	};

	// Funzione per toggle visibilità del modulo di invio messaggio
	const HandleinputToggle = (item) => {
		document.getElementById(item).classList.toggle('d-none');
	};

	// Se i dati non sono ancora caricati, mostriamo il loading
	if (loading) {
		return <div>Loading...</div>;
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
	);
}
