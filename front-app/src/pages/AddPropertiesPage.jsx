import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context/GlobalContext'
import Jumbotron from '../components/Jumbotron'
export default function AddPropertiesPage() {
	const { owner } = useParams()
	const { user, logged, setLogged } = useGlobalContext()
	useEffect(() => {
		if (owner && user.id) {
			if (owner === user.id) {
				setLogged(true)
			} else {
				setLogged(false)
			}
		}
	}, [owner, user.id, setLogged])

	// Oggetto che contiene i valori iniziali del form
	const initialFormData = {
		name: '',
		rooms: 0,
		beds: 0,
		bathrooms: 0,
		mq: 0,
		address: '',
		email_owners: '',
		image: null
	}

	// Stati principali del componente
	const [formData, setFormData] = useState(initialFormData) // Gestisce i dati del form
	const [selectedFile, setSelectedFile] = useState(null) // Gestisce il file dell'immagine selezionata
	const [properties, setProperties] = useState([]) // Contiene tutte le proprietà
	const [successMessage, setSuccessMessage] = useState('') // Messaggio di successo dopo il salvataggio
	const [showCard, setShowCard] = useState(false) // Aggiungi questo nuovo stato per tracciare quando mostrare la card
	const [savedData, setSavedData] = useState(null) // Aggiungi questo nuovo stato per i dati salvati

	// Funzione per recuperare i dati delle proprietà dal server
	// function fetchData(url = 'http://localhost:3000/api/properties') {
	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((response) => {
	// 			setProperties(response.data)
	// 		})
	// 		.catch((error) => {
	// 			console.log('Error fetching data: ', error)
	// 		})
	// }
	// useEffect(() => {
	// 	fetchData()
	// }, [])


	// Gestisce i cambiamenti nei campi del form
	function handleFormField(e) {
		const { name, type, value, checked } = e.target

		// Gestione speciale per il caricamento delle immagini
		if (name == 'image' && e.target.files.length > 0) {
			const fileSelected = e.target.files[0]
			if (fileSelected instanceof File) {
				const fileSelectedUrl = URL.createObjectURL(fileSelected);
				console.log(fileSelectedUrl);


				console.log('Selected file:', fileSelected); // x check!
				console.log('File type:', fileSelected.type); // x check!

				setFormData((prev) => ({
					...prev,
					image: fileSelected // Salva l'immagine nel form
				}))
				//console.log('type of imagine: ', typeof formData.image)
				console.log('2 File type (MIME):', formData.image.type); // x check, mostra il tipo MIME (es.image/jpeg)
				console.log('2 File name:', formData.image.name);       // x check, mostra il nome del file
				setSelectedFile(fileSelected)
			}
		} else {
			// Aggiorna lo stato del form per gli altri campi
			setFormData((prev) => ({
				...prev,
				[name]: value
			}))
		}
	}

	// Gestisce l'invio del form
	function handleFormSubmit(e) {
		e.preventDefault()

		// Validazione dei campi obbligatori
		if (!formData.name || !formData.address) {
			alert('Per favore compila tutti i campi obbligatori')
			return
		}

		const dataToSend = new FormData();
		dataToSend.append('id_user', owner);
		dataToSend.append('name', formData.name);
		dataToSend.append('rooms', Number(formData.rooms) || 0);
		dataToSend.append('beds', Number(formData.beds) || 0);
		dataToSend.append('bathrooms', Number(formData.bathrooms) || 0);
		dataToSend.append('mq', Number(formData.mq) || 0);
		dataToSend.append('address', formData.address);
		dataToSend.append('email_owners', user.email);
		if (formData.image) {
			dataToSend.append('image', formData.image); // Aggiungi l'immagine al FormData
		}


		console.log('Data to send:', Array.from(dataToSend.entries())); // x check, logga i dati inviati

		// Chiamata API per salvare i dati
		fetch(`http://localhost:3000/api/properties/${owner}`, {
			method: 'POST',
			//headers: { 'Content-Type': 'application/json' }, //cannot send img files
			//body: JSON.stringify(dataToSend)  //cannot send img files
			body: dataToSend
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setProperties(response.properties)

				setSuccessMessage('Proprietà inserita con successo!')
				setSavedData(dataToSend) // Salva i dati inviati
				setShowCard(true)

				// Reset del form
				setFormData(initialFormData)
				setSelectedFile(null)

				// Rimuovi solo il messaggio di successo dopo 5 secondi
				setTimeout(() => {
					setSuccessMessage('')
				}, 5000)
			})
			.catch((error) => alert('Errore durante il salvataggio', error))
	}

	function showProperties() {
		console.log(properties)
	}

	console.log(properties);


	return (
		<>
			<Jumbotron title={'Aggiungi una nuova proprietà'} />
			<div className="container py-3">
				{successMessage && <div className="alert alert-success">{successMessage}</div>}

				{/* La card usa savedData invece di formData */}
				{showCard && savedData && (
					<div className="card overflow-hidden mb-4">
						<div className="row">
							<div className="col-4">
								<img
									src={selectedFile ? URL.createObjectURL(selectedFile) : 'https://placehold.co/300x250/EEE/31343C'}
									alt={properties.name}
									style={{ maxWidth: '100%', height: 'auto' }}
								/>
							</div>
							<div className="col-8">
								<div className="card-title my-2">
									<h2>{properties.name}</h2>
								</div>
								<div className="mt-5">
									<h3>Caratteristiche della proprietà:</h3>
									<div className="row mt-2 g-3">
										<div className="col-4">
											<strong>Stanze: </strong>
											<span>{properties.rooms}</span>
										</div>
										<div className="col-4">
											<strong>Letti: </strong>
											<span>{properties.beds}</span>
										</div>
										<div className="col-4">
											<strong>Bagni: </strong>
											<span>{properties.bathrooms}</span>
										</div>
										<div className="col-4">
											<i className="bi bi-rulers"> </i>
											{properties.mq}
										</div>
										<div className="col-4">
											<i className="bi bi-geo-alt"> </i>
											{properties.address}
										</div>
										<div className="col-4">
											<i className="bi bi-envelope"> </i>
											{properties.email_owners}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="container d-flex justify-content-center py-3">
					<div className="mt-3 p-3 border border-primary-subtle rounded w-50 shadow">
						<h3 className="mb-2 text-center">Compila il form</h3>
						{logged ? (
							<form className="my-3 rounded p-4" onSubmit={handleFormSubmit}>
								<div className="form-group col-md-6 ">
									<div className="form-group mb-3">
										<label htmlFor="name">Nome Proprietà:</label>
										<input
											className="form-control"
											type="text"
											id="name"
											name="name"
											placeholder="Inserisci il nome della proprietà"
											required
											minLength={3}
											maxLength={100}
											value={formData.name}
											onChange={handleFormField}
										/>
									</div>


									<div className='row mb-3'>
										<div className='form-group col-md-6 '>
											<label htmlFor="image" className='form-label'>Scegli una foto: </label><br />
											<label className="btn" htmlFor="image">Scegli un file</label>
											<input className="form-control d-none" type="file" id="image" name="image" accept="image/*" onChange={handleFormField} />  {/* accept="image/*" ACCEPT ONLY IMG! */}
											{selectedFile && <img src={URL.createObjectURL(selectedFile)} alt='cover image' className='img-fluid rounded' />}
										</div>   {/* .createObjectURL() x anteprima img on browser */}

									</div>

									<div className="mb-3">
										<label htmlFor="rooms">Numero stanze:</label>
										<input
											type="number"
											className="form-control"
											id="rooms"
											name="rooms"
											required
											min={1}
											max={100}
											value={formData.rooms}
											onChange={handleFormField}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="beds">Numero letti:</label>
										<input
											type="number"
											className="form-control"
											id="beds"
											name="beds"
											required
											min={1}
											max={100}
											value={formData.beds}
											onChange={handleFormField}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="bathrooms">Numero bagni:</label>
										<input
											type="number"
											className="form-control"
											id="bathrooms"
											name="bathrooms"
											required
											min={1}
											max={100}
											value={formData.bathrooms}
											onChange={handleFormField}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="mq">Superficie in mq:</label>
										<input
											type="number"
											className="form-control"
											id="mq"
											name="mq"
											required
											min={1}
											max={1000}
											value={formData.mq}
											onChange={handleFormField}
										/>
									</div>

									<div className="form-group mb-3">
										<label className="" htmlFor="address">
											Indirizzo proprietà:
										</label>
										<input
											className="form-control"
											type="text"
											id="address"
											name="address"
											required
											minLength={5}
											maxLength={100}
											placeholder="Inserisci l'indirizzo"
											value={formData.address}
											onChange={handleFormField}
										/>{' '}
										{/* required value= */}
									</div>

									<button className="btn btn-primary w-100 mb-3" type="submit" id="formSubmit" name="submit">
										<span>Salva</span> <i className="bi bi-cloud-arrow-up" />
									</button>
								</div>
							</form>
						) : (
							<h5 className="bg-danger text-warning">Non puoi farlo!</h5>
						)}
					</div>
				</div>
			</div>
		</>
	)
}