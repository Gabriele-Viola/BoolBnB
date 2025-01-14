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
			<h3 className="mb-2 text-center">Leave your review</h3>
			<form className="newReview" onSubmit={HandleSubReview}>
				<label htmlFor="name" className="form-label">
					Name
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
					placeholder="Your name"
				/>
				<label htmlFor="nights" className="form-label">
					Nights
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
					placeholder="Number of nights spent in the property"
				/>
				<label htmlFor="review" className="form-label">
					Your review
				</label>
				<textarea
					className="form-control mb-3"
					name="review"
					id="review"
					required
					minLength={10}
					value={review}
					onChange={(e) => setReview(e.target.value)}
					placeholder="Type your review"></textarea>
				<button className="btn btn-primary" type="submit">
					<i className="bi bi-send-fill"></i> Send
				</button>
			</form>
		</div>
	)
}
