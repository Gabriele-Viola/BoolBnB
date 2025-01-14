export default function FormSendMessage({
	HandleinputToggle,
	HandleSubMessage,
	emailUser,
	setEmailUser,
	textUser,
	setTextUser
}) {
	return (
		<div
			id="newMessage"
			className="d-none vw-100 vh-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-secondary bg-opacity-75 ">
			<div className="mt-5 rounded bg-primary w-50 p-4 shadow position-relative">
				<button
					className="text-light position-absolute end-0 top-0 m-4 fs-3 btn"
					onClick={() => HandleinputToggle('newMessage')}>
					<i className="bi bi-x-circle"></i>
				</button>
				<h3 className="mb-4 text-light">Send your message</h3>
				<form className="newMessage" onSubmit={HandleSubMessage}>
					<label htmlFor="email" className="form-label text-light">
						Your email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						value={emailUser}
						onChange={(e) => setEmailUser(e.target.value)}
						className="form-control mb-3"
						placeholder="Your email address"
					/>
					<label htmlFor="message" className="form-label text-light">
						Your message
					</label>
					<textarea
						rows="5"
						className="form-control mb-3"
						name="message"
						required
						minLength={10}
						id="message"
						value={textUser}
						onChange={(e) => setTextUser(e.target.value)}
						placeholder="Your message"></textarea>
					<button className="btn btn-light text-primary" type="submit">
						<i className="bi bi-send-fill"></i> Send
					</button>
				</form>
			</div>
		</div>
	)
}
