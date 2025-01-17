export default function FormSendMessage({
	HandleinputToggle,
	HandleSubMessage,
	emailUser,
	setEmailUser,
	textUser,
	setTextUser,
	correctSend,
}) {
	return (
		<>

			<div
				id="newMessage"
				className="d-none vw-100 vh-100 d-flex flex-column justify-content-center align-items-center position-fixed top-0 start-0 bg-secondary bg-opacity-75 ">
				{/* {correctSend && <div className="alert alert-success">Proprietà inserita con successo!</div>} */}
				<div className="mt-5 rounded w-50 p-4 shadow position-relative" style={{ backgroundColor: '#29B6F6' }}>
					<button
						className="text-light position-absolute end-0 top-0 m-4 fs-3 btn"
						onClick={() => HandleinputToggle('newMessage', 'd-none')}>
						<i className="bi bi-x-circle"></i>
					</button>
					<h3 className="mb-4 text-light">Invia un messaggio</h3>
					<form className="newMessage" onSubmit={HandleSubMessage}>
						<label htmlFor="email" className="form-label text-light">
							La tua email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							maxLength={255}
							value={emailUser}
							onChange={(e) => setEmailUser(e.target.value)}
							className="form-control mb-3"
							placeholder="Inserisci il tuo indirizzo email (max 255 caratteri)"
						/>
						<label htmlFor="message" className="form-label text-light">
							Messaggio:
						</label>
						<textarea
							rows="5"
							className="form-control mb-3"
							name="message"
							required
							minLength={10}
							maxLength={1000}
							id="message"
							value={textUser}
							onChange={(e) => setTextUser(e.target.value)}
							placeholder="Inserisci il tuo messaggio (min 10 caratteri)"></textarea>
						<button className="btn btn-light" style={{ color: '#29B6F6' }} type="submit">
							<i className="bi bi-send-fill"></i> Invia!
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
