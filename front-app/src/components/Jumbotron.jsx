export default function Jumbotron({ title, subtitle, className = '', showSearch = false, onSearchChange }) {
	return (
		<div className={`banner bg-primary text-white p-5 mb-3 rounded shadow-lg ${className}`}>
			<div className="container">
				<h3 className="">{title}</h3>
				{subtitle && <p className="lead mt-3">{subtitle}</p>}

				{/* Mostra la barra di ricerca solo se showSearch è true */}
				{showSearch && (
					<div className="mt-4">
						<input
							type="search"
							className="form-control"
							placeholder="Cerca per nome o indirizzo..."
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
