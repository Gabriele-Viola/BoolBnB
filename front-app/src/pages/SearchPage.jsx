import Jumbotron from '../components/Jumbotron'
export default function SearchPage() {
	const handleSubmit = (e) => {
		e.preventDefault() // Previene il comportamento predefinito del form
		// Qui in futuro gestiremo la logica di ricerca
	}

	return (
		<div className="container ">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<Jumbotron title="Cerca appartamenti" />

					<form onSubmit={handleSubmit} className="card p-4 shadow-sm">
						<div className="mb-3">
							<label htmlFor="city" className="form-label">
								Città
							</label>
							<input type="text" id="city" className="form-control" placeholder="Inserisci la città..." />
						</div>

						<div className="mb-3">
							<label htmlFor="minRooms" className="form-label">
								Numero minimo di stanze
							</label>
							<input type="number" id="minRooms" className="form-control" min="1" placeholder="Es: 2" />
						</div>

						<div className="mb-3">
							<label htmlFor="minBeds" className="form-label">
								Numero minimo di letti
							</label>
							<input type="number" id="minBeds" className="form-control" min="1" placeholder="Es: 3" />
						</div>

						<button type="submit" className="btn btn-primary w-100">
							Cerca
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
