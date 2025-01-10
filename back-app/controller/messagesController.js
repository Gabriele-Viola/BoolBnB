const connection = require('../db/connection')

function sendMessage(req, res) {
	// Validazione dei dati in ingresso
	const { id_user, id_property, text_message } = req.body
	if (!id_user || !id_property || !text_message) {
		return res.status(400).json({
			success: false,
			error: 'All fields are required'
		})
	}

	// Query SQL per inserire il messaggio
	const sql = `INSERT INTO messages (id_user, id_property, text_message) VALUES (?, ?, ?)`

	// Impostiamo il Content-Type prima di eseguire la query
	res.setHeader('Content-Type', 'application/json')

	// Eseguiamo la query
	connection.query(sql, [id_user, id_property, text_message], (err, result) => {
		if (err) {
			return res.status(500).json({
				success: false,
				error: 'Error sending message',
				details: err
			})
		}
		return res.status(201).json({
			success: true,
			message: 'message sent successfully',
			affectedRows: result.affectedRows
		})
	})
}

module.exports = {
	sendMessage
}
