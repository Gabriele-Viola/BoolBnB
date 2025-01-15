import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'





export default function Homepage() {
	return (
		<>
			<Link to="/add/properties/:owner">Aggiungi</Link>
			<PropertyCard />
		</>
	)
}
