import { useState, useEffect } from 'react'

export default function Homepage() {
	const [properties, setProperties] = useState([])
	const url = 'http://localhost:3000/api/properties'
	function fetchData() {
		fetch(url)
			.then((res) => res.json())
			.then((response) => setProperties(response))
	}
	useEffect(() => {
		fetchData()
	}, [])

	console.log(properties)

	return (
		<>
			<h1>Homepage</h1>
			{properties?.map((property) => (
				<div key={property.id}>
					<h2>{property.name}</h2>
					<p>{property.address}</p>
				</div>
			))}
		</>
	)
}
