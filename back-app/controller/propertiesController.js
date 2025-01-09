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
// method registration to add a new user in the db
function registration(req, res) {
	const sql = `INSERT INTO users (name, surname, userName, password, email, phone, type) VALUES (?, ?, ?, ?, ?, ?, ?)`
	const { name, surname, userName, password, email, phone, type } = req.body
	//veryfing if name, surname and userName are at least 3 characters long
	if (name.length < 3 || surname.length < 3 || userName.length < 3)
		return res.status(400).json({
			error: 'Name, surname and userName must be at least 3 characters long'
		})
	//verify correct password format
	if (password.length < 8 || /[^a-zA-Z0-9]/.test(password))
		return res.status(400).json({
			error: 'Password must be at least 8 characters long and contain only letters and numbers'
		})
	//verify correct email format
	//the email must have at least 1 character before the @, at least 1 charcter after @ and 2 characters after the last dot
	if (!/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
		return res.status(400).json({
			error: 'Email incorrect'
		})
	//verify correct phone format national or international
	if (
		(phone.length === 10 && !/^[0-9]{10}$/.test(phone)) ||
		(phone.length !== 10 && !/^\+[0-9]{12,15}$/.test(phone))
	)
		return res.status(400).json({
			error: 'Phone number incorrect'
		})
	// Verify if the type is UI or UP
	if (type !== UI || type !== UP)
		return res.status(400).json({
			error: 'Type must be UI or UP'
		})

	connection.query(sql, [name, surname, userName, password, email, phone, type], (err, result) => {
		if (err)
			return res.status(500).json({
				error: err
			})
		return res.status(201).json({
			success: true
		})
	})
}


module.exports = {
	index,
	show,
	create,
	logIn,
	registration
}
