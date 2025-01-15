import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useGlobalContext } from '../Context/GlobalContext';

export default function Homepage() {
	const [url, setUrl] = useState("/login");
	const { user, logout } = useGlobalContext(); // Ottieni il contesto globale e la funzione logout
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (user !== 'Guest') {
			setUrl(`/add/properties/${user.id}`);
			setIsLoggedIn(true); // Se l'utente è loggato, aggiorna lo stato
		} else {
			setIsLoggedIn(false); // Se l'utente non è loggato, aggiorna lo stato
		}
	}, [user]);

	// Funzione per gestire il logout
	const handleLogout = () => {
		logout(); // Chiama la funzione logout dal contesto globale
		setIsLoggedIn(false); // Aggiorna lo stato a non loggato
	};

	return (
		<>
			<div className="container py-3">
				{/* Contenitore dei due pulsanti allineati sulla stessa riga */}
				<div className='d-flex justify-content-between mb-3'>
					{/* Pulsante "Aggiungi Proprietà" */}
					<Link to={url} className="btn btn-primary mb-3">
						Aggiungi Proprietà
					</Link>

					{/* Pulsante Login/Logout allineato a sinistra */}
					<div>
						{isLoggedIn ? (
							<button onClick={handleLogout} className="btn btn-danger">
								Logout
							</button>
						) : (
							<Link to="/login" className="btn btn-success">
								Login
							</Link>
						)}
					</div>
				</div>

				{/* Mostra informazioni sull'utente loggato */}
				<div className='d-flex justify-content-end'>
					{user?.id && <span>Accesso effettuato come: <h3>{user.user_name}</h3></span>}
				</div>
			</div>

			{/* Mostra le proprietà */}
			<PropertyCard />
		</>
	);
}
