import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function FormSendMessage({
	HandleinputToggle,
	HandleSubMessage,
	emailUser,
	setEmailUser,
	textUser,
	setTextUser,
	fromName,  // Nome mittente
	setFromName,  // Funzione per aggiornare il nome mittente
	toName,  // Nome destinatario
	setToName,  // Funzione per aggiornare il nome destinatario
}) {
	const form = useRef();

	// Gestione dell'invio del messaggio
	const handleSubmit = (e) => {
		e.preventDefault();

		const templateParams = {
			from_name: fromName, // Nome del mittente
			to_name: toName,     // Nome del destinatario
			user_email: emailUser,
			message: textUser,
		};

		emailjs
			.sendForm('service_o1o92us', 'template_zna5hon', form.current, {
				publicKey: 'mKOnhKruH3ZwuWqlH',
			})
			.then(
				(result) => {
					console.log('SUCCESS!', result.text);
					alert('Messaggio inviato con successo!');
					setFromName(''); // Resetta il nome del mittente
					setToName('');   // Resetta il nome del destinatario
					setEmailUser(''); // Resetta l'email
					setTextUser(''); // Resetta il messaggio
				},
				(error) => {
					console.log('FAILED...', error.text);
					alert('Errore nell\'invio del messaggio');
				}
			);
	};

	return (
		<div
			id="newMessage"
			className="d-none vw-100 vh-100 d-flex flex-column justify-content-center align-items-center position-fixed top-0 start-0 bg-secondary bg-opacity-75"
		>
			<div className="mt-5 rounded w-50 p-4 shadow position-relative" style={{ backgroundColor: '#29B6F6' }}>
				<button
					className="text-light position-absolute end-0 top-0 m-4 fs-3 btn"
					onClick={() => HandleinputToggle('newMessage', 'd-none')}
				>
					<i className="bi bi-x-circle"></i>
				</button>
				<h3 className="mb-4 text-light">Invia un messaggio</h3>
				<form ref={form} onSubmit={handleSubmit}>
					<label htmlFor="from_name" className="form-label text-light">
						Il tuo nome (mittente)
					</label>
					<input
						type="text"
						id="from_name"
						name="from_name"
						value={fromName}
						onChange={(e) => setFromName(e.target.value)}
						className="form-control mb-3"
						placeholder="Inserisci il tuo nome"
						required
					/>
					<label htmlFor="to_name" className="form-label text-light">
						Email destinatario
					</label>
					<input
						type="text"
						id="to_name"
						name="to_name"
						value={toName}
						onChange={(e) => setToName(e.target.value)}
						className="form-control mb-3"
						placeholder="Inserisci il nome del destinatario"
						required
					/>
					<label htmlFor="email" className="form-label text-light">
						La tua email
					</label>
					<input
						type="email"
						id="email"
						name="user_email"
						value={emailUser}
						onChange={(e) => setEmailUser(e.target.value)}
						className="form-control mb-3"
						placeholder="Inserisci il tuo indirizzo email"
						required
					/>
					<label htmlFor="message" className="form-label text-light">
						Messaggio:
					</label>
					<textarea
						rows="5"
						id="message"
						name="message"
						value={textUser}
						onChange={(e) => setTextUser(e.target.value)}
						className="form-control mb-3"
						placeholder="Inserisci il tuo messaggio"
						required
					/>
					<button className="btn btn-light" style={{ color: '#29B6F6' }} type="submit">
						<i className="bi bi-send-fill"></i> Invia!
					</button>
				</form>
			</div>
		</div>
	);
}