const connection = require('../db/connection')

//metodo index che restituisce tutti gli oggetti presenti nel db
function index(req, res) {
	const sql = 'SELECT * FROM properties'

	connection.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({
				error: err
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
	const sql = `SELECT * FROM properties WHERE id = ?`

	connection.query(sql, [id], (err, result) => {
		if (err)
			return res.status(500).json({
				error: err
			})
		if (result.length === 0)
			return res.status(404).json({
				error: 'Property not found'
			})
		const property = result[0]
		res.status(200).json({
			property
		})
	})
}

// metodo create per aggiungere nuovo appartamento
function create(req, res) {
	const owner = req.params.owner
	const sql = `INSERT INTO properties (id_user, name, rooms, beds, bathrooms, m2, address, email_owners, \`like\`, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`
	const { name, rooms, beds, bathrooms, m2, address, email_owners, like, image } = req.body
	connection.query(sql, [owner, name, rooms, beds, bathrooms, m2, address, email_owners, like, image], (err, result) => {
		if (err)
			return res.status(500).json({
				error: "Something went wrong...",
				err: err
			})
		return res.status(201).json({
			success: true
		})
	})
}
// method LogIn to check if the user is present in the db

function logIn(req, res) {
	const email = req.body.email
	const password = req.body.password

	const sql = `SELECT * FROM users WHERE email = ? `
	// const sql = `SELECT * FROM users WHERE email = ? AND password = ?`


	connection.query(sql, [email], (err, result) => {
		if (err)
			return res.status(500).json({
				error: err
			})
		// verify if the user email is present in the db
		if (result.length === 0)
			return res.status(404).json({
				error: 'There is no user with this email'
			})
		//verify if the password is correct
		if (result[0].password !== password)
			return res.status(404).json({ error: 'Password is not correct' })
		const user = result[0]
		// return the user
		res.status(200).json({
			user
		})
	})
}

module.exports = {
	index,
	show,
	create,
	logIn
}
