import { useState, useEffect } from 'react'

export default function PropertyCard() {
	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const url = 'http://localhost:3000/api/properties'

	// Fetch data dall'API con async/await per migliorare la leggibilità del codice
	async function fetchData() {
		try {
			const response = await fetch(url)
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

	// mostriamo un messaggio di caricamento se loading è true
	if (loading) return <p>Loading...</p>

	// mostriamo un messaggio di errore se c'è un errore
	if (error) return <p>Error: {error}</p>

	return (
		<>
			<div className="container mt-4">
				<div className="row g-3">
					{properties.length > 0 ? (
						properties.map((property) => (
							<div className="col-12 col-md-6 col-lg-4" key={property.id}>
								<div className="card ">
									<div className="card-body">
										<h3 className="card-title ">{property.name}</h3>
										<p className="card-text">{property.address}</p>
										<span className="text-muted position-absolute bottom-0 end-0">❤️ {property.like}</span>
									</div>
									<img
										src={property.image || 'https://placehold.co/300x250/EEE/31343C'}
										alt={property.name}
										className="card-img-top p-0"
										// mostra un'immagine di placeholder se l'immagine non è disponibile
										onError={(e) => (e.target.src = 'https://placehold.co/300x250/EEE/31343C')}
										// Responsive image
										style={{ width: '100%', height: 'auto' }}
									/>
								</div>
							</div>
						))
					) : (
						<p>No properties available</p>
					)}
				</div>
			</div>
		</>
	)
}
