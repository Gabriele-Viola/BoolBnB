export default function FormAddReview({
	HandleSubReview,
	nameUser,
	setNameUser,
	nights,
	setNights,
	review,
	setReview
}) {
	return (
		<div className="mt-3 p-3 border border-primary-subtle rounded">
			<h3 className="mb-2 text-center">Lascia una recensione</h3>
			<form className="newReview" onSubmit={HandleSubReview}>
				<label htmlFor="name" className="form-label">
					Nome
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					minLength={3}
					value={nameUser}
					onChange={(e) => setNameUser(e.target.value)}
					className="form-control mb-3"
					placeholder="Inserisci il tuo nome"
				/>
				<label htmlFor="nights" className="form-label">
					Notti
				</label>
				<input
					type="number"
					id="nights"
					name="nights"
					required
					min={1}
					value={nights}
					onChange={(e) => setNights(e.target.value)}
					className="form-control mb-3"
					placeholder="Per quante notti hai soggiornato"
				/>
				<label htmlFor="review" className="form-label">
					La tua recensione:
				</label>
				<textarea
					className="form-control mb-3"
					name="review"
					id="review"
					required
					minLength={10}
					value={review}
					onChange={(e) => setReview(e.target.value)}
					placeholder="Inserisci la tua recensione"></textarea>
				<button className="btn btn-primary" type="submit">
					<i className="bi bi-send-fill"></i> Invia!
				</button>
			</form>
		</div>
	)
}
