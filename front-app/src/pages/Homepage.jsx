import { Link } from 'react-router-dom';
import { useGlobalContext } from '../Context/GlobalContext';
import PropertyCard from '../components/PropertyCard';

export default function Homepage() {
	const { user } = useGlobalContext(); // Ottieni il contesto globale per verificare se l'utente è loggato

	return (
		<>
			<div className="container py-3">
				{/* Contenitore per il pulsante "Aggiungi Proprietà" se l'utente è loggato */}
				{user !== 'Guest' && user?.id && (
					<div className="mb-3">
						<Link to={`/add/properties/${user.id}`} className="btn btn-primary">
							Aggiungi una nuova proprietà
						</Link>
					</div>
				)}

				{/* Mostra le proprietà */}
				<PropertyCard />
			</div>
		</>
	);
}
