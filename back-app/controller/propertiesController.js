const connection = require('../db/connection')

//metodo index che restituisce tutti gli oggetti presenti nel db in ordine decrescente di like
function index(req, res) {
	const sql = 'SELECT * FROM properties ORDER BY `like` DESC'

	connection.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({
				error: 'something went wrong...'
			})
		}
		res.status(200).json({
			data: result,
			count: result.length
		})
	})
}

//metodo show che restituisce l'appartamento selezionato
function show(req, res) {
	const id = req.params.id
	const sql = `SELECT properties.*, 
        			JSON_ARRAYAGG(services.name) AS services
					FROM properties
					LEFT JOIN properties_services ON properties.id = properties_services.id_property
					LEFT JOIN services ON properties_services.id_service = services.id
					WHERE properties.id = ?
					GROUP BY properties.id;`

	connection.query(sql, [id], (err, result) => {
		if (err)
			return res.status(500).json({
				error: 'error server side'
			})
		if (result.length === 0)
			return res.status(404).json({
				error: 'Property not found'
			})
		const property = result[0]
		res.status(200).json({
			status: 'success',
			success: true,
			property
		})
	})
}

// metodo create per aggiungere nuovo appartamento
function create(req, res) {
	const owner = req.params.owner
	const sql = `INSERT INTO properties (id_user, name, rooms, beds, bathrooms, m2, address, email_owners, \`like\`, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`
	const { name, rooms, beds, bathrooms, m2, address, email_owners, like, image } = req.body

	//verifica che i dati siano validi

	if (beds < 1 || rooms < 1 || bathrooms < 1 || m2 < 1)
		return res.status(400).json({
			error: 'Invalid data'
		})
	connection.query(
		sql,
		[owner, name, rooms, beds, bathrooms, m2, address, email_owners, like, image],
		(err, result) => {
			if (err)
				return res.status(500).json({
					error: 'Something went wrong...'
				})
			return res.status(201).json({
				success: true
			})
		}
	)
}

function likeUpdate(req, res) {
	const id = req.params.id
	const sql = `UPDATE properties SET \`like\` = \`like\` + 1 WHERE id = ?`
	connection.query(sql, [id], (err, result) => {
		if (err)
			return res.status(500).json({
				error: 'Something went wrong...'
			})
		return res.status(200).json({
			success: true,
			message: 'Like updated'
		})
	})
}

module.exports = {
	index,
	show,
	create,
	likeUpdate
}
