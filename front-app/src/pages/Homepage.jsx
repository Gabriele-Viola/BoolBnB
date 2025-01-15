import PropertyCard from '../components/PropertyCard'
import { Link } from 'react-router-dom'

export default function Homepage() {
	return (
		<>
			<div className="container py-3">
				<Link to="/add/properties/1" className="btn btn-primary mb-3">
					Aggiungi Proprietà
				</Link>
			</div>
			<PropertyCard />
		</>
	)
}
