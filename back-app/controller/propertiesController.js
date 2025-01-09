const { data } = require('react-router-dom')
const connection = require('../db/connection')

//metodo index che restituisce tutti gli oggetti presenti nel db
const index = (req, res) => {
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

const show = (req, res) => {
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

module.exports = {
	index,
	show
}
