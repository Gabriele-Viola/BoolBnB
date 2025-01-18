export default function Jumbotron({ title, subtitle, className = '' }) {
	return (
		<div className={`banner bg-primary text-white p-5 mb-3 rounded shadow-lg ${className}`}>
			<div className="container">
				<h3 className="">{title}</h3>
				{subtitle && <p className="lead mt-3">{subtitle}</p>}
			</div>
		</div>
	)
}
