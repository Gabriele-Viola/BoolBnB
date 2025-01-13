import { useState, useEffect } from 'react';

export default function PropertyCard() {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const url = 'http://localhost:3000/api/properties';

	// Fetch data dall'API con async/await per migliorare la leggibilità del codice
	async function fetchData() {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch properties');
			}
			const data = await response.json();
			// Aggiorna lo stato con i dati ricevuti
			setProperties(data?.data || []);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	// mostriamo un messaggio di caricamento se loading è true
	if (loading) return <p>Loading...</p>;

	// mostriamo un messaggio di errore se c'è un errore
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			{properties.length > 0 ? (
				properties.map((property) => (
					<div key={property.id} className="property-card">
						<h3>{property.name}</h3>
						<p>{property.address}</p>
						<p>{property.like}</p>
						<img
							src={property.image || 'https://placehold.co/300x250/EEE/31343C'}
							alt={property.name}
							// mostra un'immagine di placeholder se l'immagine non è disponibile
							onError={(e) => e.target.src = 'https://placehold.co/300x250/EEE/31343C'}
							// Responsive image 
							style={{ width: '100%', height: 'auto' }}
						/>
					</div>
				))
			) : (
				<p>No properties available</p>
			)}
		</>
	);
}

