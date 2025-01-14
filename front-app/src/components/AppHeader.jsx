import { NavLink } from 'react-router-dom'

export default function AppHeader() {
	return (
		<header className="bg-primary text-white py-4 shadow-sm fixed-top">
			<div className="container d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<NavLink to="/" className="text-white text-decoration-none">
						<h1 className="mb-0 fs-3">BoolB&B</h1>
					</NavLink>
				</div>

				<nav>
					<ul className="list-unstyled d-flex gap-4 mb-0">
						<li>
							<NavLink to="/about" className="text-white text-decoration-none">
								Chi Siamo
							</NavLink>
						</li>
						<li>
							<NavLink to="/contact" className="text-white text-decoration-none">
								Contatti
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
