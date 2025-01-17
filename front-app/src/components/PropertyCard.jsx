import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/GlobalContext'

// Definizione del componente principale che mostra le card delle proprietà
export default function PropertyCard() {
	// Estrazione delle variabili dal contesto globale
	const { error, setError, loading, setLoading, user } = useGlobalContext()
	// Stato locale per memorizzare l'elenco delle proprietà
	const [properties, setProperties] = useState([])

	// URL dell'endpoint API per recuperare le proprietà
	const urlIndex = 'http://localhost:3000/api/properties'

	// Fetch data dall'API con async/await per migliorare la leggibilità del codice
	async function fetchData() {
		try {
			const response = await fetch(urlIndex)
			if (!response.ok) {
				throw new Error('Failed to fetch properties')
			}
			const data = await response.json()
			// Aggiorna lo stato con i dati ricevuti
			setProperties(data?.data || [])
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	// Funzione che gestisce il click sul pulsante "like"
	const handleLikeIncrement = async (propertyId) => {
		try {
			const response = await fetch(`http://localhost:3000/api/like/${propertyId}`, {
				method: 'PUT'
			})

			if (response.ok) {
				// Ricarica tutti i dati dopo l'aggiornamento del like
				fetchData()
			}
		} catch (err) {
			console.error('Errore:', err)
		}
	}

	// mostriamo un messaggio di caricamento se loading è true
	if (loading) return <p>Loading...</p>

	// mostriamo un messaggio di errore se c'è un errore
	if (error) return <p>Error: {error}</p>

	console.log(user)
	console.log(properties)

	return (
		<>
			<div className="row g-3">
				{/* Verifica se ci sono proprietà da mostrare */}
				{properties.length > 0 ? (
					properties.map((property) => (
						// Colonna responsive per ogni proprietà
						<div className="col-12 col-md-6 col-lg-4" key={property?.id}>
							{/* Card della proprietà con bordo speciale per le proprietà dell'utente */}
							<div
								className={`card h-100 shadow ${user.email === property.email_owners ? 'border-success border-thick' : ''
									}`}>
								<img
									src={
										property.image
											? `http://localhost:3000/uploads/${property.image}`
											: 'https://placehold.co/300x250/EEE/31343C'
									}
									alt={property.name}
									className="card-img-top p-0"
									// mostra un'immagine di placeholder se l'immagine non è disponibile
									onError={(e) => {
										console.log('URL immagine che ha dato errore:', `http://localhost:3000/uploads/${property.image}`)
										e.target.src = 'https://placehold.co/300x250/EEE/31343C'
									}}
									// Responsive image
									style={{ width: '100%', height: '300px', objectFit: 'cover' }}
								/>
								<div className="card-body">
									<h3 className="card-title ">{property.name}</h3>
									<p className="card-text">{property.address}</p>
									<button
										onClick={() => handleLikeIncrement(property.id)}
										className="position-absolute top-0 end-0 p-2 bg-white bg-opacity-25 custom-blur  border-0 rounded">
										<span style={{ fontSize: '1.2rem' }}>❤️ {property.like}</span>
									</button>
									<Link to={`/properties/${property.slug}`} className="text-decoration-none text-dark">
										<button className="btn btn-primary">Dettagli</button>
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					// Messaggio mostrato quando non ci sono proprietà
					<p>Nessuna proprietà disponibile!</p>
				)}
			</div>
		</>
	)
}
