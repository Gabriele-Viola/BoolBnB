import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context/GlobalContext'

export default function AddPropertiesPage() {
	const { owner } = useParams()
	const { user } = useGlobalContext()


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
	const [filteredProperties, setFilteredProperties] = useState(properties) // Proprietà filtrate
	const [successMessage, setSuccessMessage] = useState('') // Messaggio di successo dopo il salvataggio
	const [showCard, setShowCard] = useState(false) // Aggiungi questo nuovo stato per tracciare quando mostrare la card
	const [savedData, setSavedData] = useState(null) // Aggiungi questo nuovo stato per i dati salvati

	// Funzione per recuperare i dati delle proprietà dal server
	function fetchData(url = 'http://localhost:3000/api/properties') {
		fetch(url)
			.then((res) => res.json())
			.then((response) => {
				setProperties(response.data)
			})
			.catch((error) => {
				console.log('Error fetching data: ', error)
			})
	}
	useEffect(() => {
		fetchData()
	}, [])
	useEffect(() => {
		setFilteredProperties(properties)
	}, [properties])

	// Gestisce i cambiamenti nei campi del form
	function handleFormField(e) {
		const { name, type, value, checked } = e.target

		// Gestione speciale per il caricamento delle immagini
		if (name == 'image' && e.target.files.length > 0) {
			const fileSelected = e.target.files[0]
			if (fileSelected instanceof File) {
				const fileSelectedUrl = URL.createObjectURL(fileSelected)
				setFormData((prev) => ({
					...prev,
					image: fileSelected // Salva l'immagine nel form
				}))
				console.log('type of imagine: ', typeof formData.image)
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

		// Prepara i dati da inviare al server convertendo i valori numerici
		const dataToSend = {
			id_user: owner,
			name: formData.name,
			rooms: Number(formData.rooms) || 0,
			beds: Number(formData.beds) || 0,
			bathrooms: Number(formData.bathrooms) || 0,
			mq: Number(formData.mq) || 0,
			address: formData.address,
			email_owners: user.email,
			image: formData.image || 'https://placehold.co/300x250/EEE/31343C'
		}

		// Chiamata API per salvare i dati
		fetch(`http://localhost:3000/api/properties/${owner}`, {

			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataToSend)
		})

			.then((res) => res.json())
			.then((response) => {
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
				fetchData()
			})
			.catch((error) => alert('Errore durante il salvataggio'))
	}

	function showProperties() {
		console.log(properties)
	}



	//id, id_user, name, rooms(int), beds(int), bathrooms(int), mq(int), address, email_owners, like(int), image

	return (

		<div className="container py-3">
			{successMessage && <div className="alert alert-success">{successMessage}</div>}

			{/* La card usa savedData invece di formData */}
			{showCard && savedData && (
				<div className="card overflow-hidden mb-4">
					<div className="row">
						<div className="col-4">
							<img
								src={selectedFile ? URL.createObjectURL(selectedFile) : 'https://placehold.co/300x250/EEE/31343C'}
								alt={savedData.name}
								style={{ maxWidth: '100%', height: 'auto' }}
							/>
						</div>
						<div className="col-8">
							<div className="card-title my-2">
								<h2>{savedData.name}</h2>
							</div>
							<div className="mt-5">
								<h3>Caratteristiche della proprietà:</h3>
								<div className="row mt-2 g-3">
									<div className="col-4">
										<strong>Stanze: </strong>
										<span>{savedData.rooms}</span>
									</div>
									<div className="col-4">
										<strong>Letti: </strong>
										<span>{savedData.beds}</span>
									</div>
									<div className="col-4">
										<strong>Bagni: </strong>
										<span>{savedData.bathrooms}</span>
									</div>
									<div className="col-4">
										<i className="bi bi-rulers"> </i>
										{savedData.mq}
									</div>
									<div className="col-4">
										<i className="bi bi-geo-alt"> </i>
										{savedData.address}
									</div>
									<div className="col-4">
										<i className="bi bi-envelope"> </i>
										{savedData.email_owners}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="container d-flex justify-content-center py-3">
				<div className="mt-3 p-3 border border-primary-subtle rounded w-50">
					<h3 className="mb-2 text-center">Aggiungi la tua proprietà</h3>
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
									value={formData.name} onChange={handleFormField} />
							</div>

							<div className='row mb-3'>
								<div className='form-group col-md-6 '>
									<label htmlFor="formFile" className='form-label'>Scegli una foto: </label><br />
									<label className="btn" htmlFor="formFile">Scegli un file</label>
									<input className="form-control d-none" type="file" id="image" name="image" accept="image/*" onChange={handleFormField} />  {/* accept="image/*" ACCEPT ONLY IMG! */}
									{selectedFile && <img src={selectedFile} alt='cover image' className='img-fluid rounded' />}
								</div>
							</div>

							<div className="mb-3">
								<label htmlFor="rooms">Numero stanze:</label>
								<input type="number"
									className="form-control"
									id="rooms"
									name="rooms"
									required
									min={1}
									max={100}
									value={formData.rooms} onChange={handleFormField} />
							</div>
							<div className="mb-3">
								<label htmlFor="beds">Numero letti:</label>
								<input type="number"
									className="form-control"
									id="beds" name="beds"
									required
									min={1}
									max={100}
									value={formData.beds} onChange={handleFormField} />
							</div>
							<div className="mb-3">
								<label htmlFor="bathrooms">Numero bagni:</label>
								<input type="number"
									className="form-control"
									id="bathrooms"
									name="bathrooms"
									required
									min={1}
									max={100}
									value={formData.bathrooms} onChange={handleFormField} />
							</div>
							<div className="mb-3">
								<label htmlFor="mq">Superficie in mq:</label>
								<input type="number"
									className="form-control"
									id="mq"
									name="mq"
									required
									min={1}
									max={1000}
									value={formData.mq} onChange={handleFormField} />
							</div>

							<div className='form-group mb-3'>
								<label className="" htmlFor="address">Indirizzo proprietà:</label>
								<input
									className='form-control'
									type="text"
									id="address"
									name="address"
									required
									minLength={5}
									maxLength={100}
									placeholder="Inserisci l'indirizzo"
									value={formData.address} onChange={handleFormField} /> {/* required value= */}
							</div>
							<div className='form-group col-md-8 mt-4 text-center'>
								<button className='btn btn-DarkRose w-100 mb-3' type='submit' id='formSubmit' name='submit'>
									<span className='d-flex align-items-center justify-content-center gap-2'>
										<button className="btn btn-primary">Salva <i className="bi bi-cloud-arrow-up" /></button>
									</span>
								</button>
							</div>
						</div>
					</form>
				</div>

			</div>
		</div>
	)
}
