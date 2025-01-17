import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/GlobalContext' // Assicurati di avere il context

export default function AppHeader() {
	const { user, setUser, setLogged } = useGlobalContext() // Usa il context per recuperare l'utente loggato
	const navigate = useNavigate() // Per fare il redirect

	// Funzione di logout
	const handleLogout = () => {
		setUser('Guest') // Resetta l'utente nel contesto
		setLogged(false)
		localStorage.removeItem('user') // Rimuovi l'utente dal localStorage
		navigate('/') // Redirigi alla homepage
	}

	return (
		<header className="text-white py-1 shadow-sm" style={{ backgroundColor: '#29B6F6' }}>
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<NavLink to="/" className="text-white text-decoration-none">
						<img className="logo" src="/logo.png" alt="Logo" />
					</NavLink>
				</div>

				<nav className="d-flex">
					<ul className="list-unstyled d-flex gap-4 mb-0">
						<li>
							<NavLink to="/" className="text-white text-decoration-none fs-6">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/search" className="text-white text-decoration-none fs-6">
								Cerca
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" className="text-white text-decoration-none fs-6">
								Chi Siamo
							</NavLink>
						</li>
						<li>
							<NavLink to="/contact" className="text-white text-decoration-none fs-6">
								Contatti
							</NavLink>
						</li>

						{/* Mostra il nome dell'utente e il pulsante di logout se l'utente è loggato */}
						{user !== 'Guest' ? (
							<>
								<li>
									<span className="text-white fs-6 me-1">USER: {user.user_name}</span>
								</li>
								<li>
									<button onClick={handleLogout} className="btn btn-danger btn-sm fs-6">
										Logout
									</button>
								</li>
							</>
						) : (
							<li>
								<Link to="/login" className="btn btn-success btn-sm fs-6">
									Login
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	)
}
