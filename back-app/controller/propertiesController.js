const connection = require('../db/connection')
const jwt = require('jsonwebtoken')
const secretKey = process.env.CRYPTOKEY

//funtion to decrypt token
function decrypt(id) {
	try {
		const decoded = jwt.verify(id, secretKey)
		return decoded.id
	} catch (err) {
		console.error('Errore nella decodifica dell\'id', err.message)
		return null
	}
}


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
	const tokenOwner = req.params.owner

	const owner = decrypt(tokenOwner)

	const sql = `INSERT INTO properties (id_user, name, rooms, beds, bathrooms, mq, address, email_owners, \`like\`, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`
	const { name, rooms, beds, bathrooms, mq, address, email_owners, like, image } = req.body

	//verifica che i dati siano validi
	if (!name || !rooms || !beds || !bathrooms || !mq || !address)
		return res.status(400).json({
			error: 'Missing data'
		})
	if (beds < 1 || beds > 100 || rooms < 1 || rooms > 100 || bathrooms < 1 || bathrooms > 100 || mq < 1 || mq > 10000)
		return res.status(400).json({
			error: 'Invalid data'
		})
	if (name.length < 3 || name.length > 100 || address.length < 3 || address.length > 100)
		return res.status(400).json({
			error: 'Length error name or address'
		})

	connection.query(
		sql,
		[owner, name, rooms, beds, bathrooms, mq, address, email_owners, like, image],
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
