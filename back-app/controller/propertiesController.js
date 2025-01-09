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




module.exports = {
    index
}






