import { NavLink } from 'react-router-dom'

export default function AppHeader() {
	return (
		<header className=" text-white py-1 shadow-sm fixed-top" style={{ backgroundColor: '#29B6F6' }}>
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<NavLink to="/" className="text-white text-decoration-none">
						<img className="logo" src="/logo.png" alt="" />
					</NavLink>
				</div>

				<nav>
					<ul className="list-unstyled d-flex gap-4 mb-0">
						<li>
							<NavLink to="/" className="text-white text-decoration-none fs-5">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" className="text-white text-decoration-none fs-5">
								Chi Siamo
							</NavLink>
						</li>
						<li>
							<NavLink to="/contact" className="text-white text-decoration-none fs-5">
								Contatti
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
