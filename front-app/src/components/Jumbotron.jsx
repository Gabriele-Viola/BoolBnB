// Componente Jumbotron che mostra un banner con titolo, sottotitolo opzionale e barra di ricerca

export default function Jumbotron({ title, subtitle, className = '', showSearch = false, onSearchChange }) {
	return (
		// Container principale del banner con stile bootstrap
		<div className={`banner bg-primary text-white p-5 mb-3 rounded shadow-lg ${className}`}>
			<div className="container">
				{/* Titolo principale */}
				<h3 className="">{title}</h3>

				{/* Sottotitolo mostrato solo se presente */}
				{subtitle && <p className="lead mt-3">{subtitle}</p>}

				{/* Barra di ricerca mostrata solo se showSearch è true */}
				{showSearch && (
					<div className="mt-4">
						{/* Input di ricerca che chiama onSearchChange quando modificato */}
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
