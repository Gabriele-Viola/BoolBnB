import { useState, useEffect } from 'react'
export default function PropertyCard() {
	const [properties, setProperties] = useState([])
	const url = 'http://localhost:3000/api/properties'
	function fetchData() {
		fetch(url)
			.then((res) => res.json())
			.then((response) => setProperties(response.data))
	}
	useEffect(() => {
		fetchData()
	}, [])

	console.log(properties)
	return (
		<>
			{properties.map((property) => (
				<div key={property.id}>
					<h3>{property.name}</h3>
					<p>{property.address}</p>
					<p>{property.like}</p>
					<img src={property.image || 'https://placehold.co/600x400/EEE/31343C'} alt={property.name} />
				</div>
			))}
		</>
	)
}
