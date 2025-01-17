import { Link } from 'react-router-dom'

export default function Jumbotron({ title, subtitle, className = '' }) {
	return (
		<>
			<div className={`banner bg-primary text-white p-5 mb-5 rounded shadow-lg ${className}`}>
				<div className="container position-relative">
					<h3 className="">{title}</h3>
					{subtitle && <p className="lead mt-3">{subtitle}</p>}
					<div className='position-absolute end-0'>

						<Link className='btn btn-light text-primary' to={'/search'}>Ricerca avanzata</Link>
					</div>
				</div>
			</div>
		</>
	)
}
