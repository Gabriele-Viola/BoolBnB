const connection = require('../db/connection')
function servicesController(req, res) {
    const sql = 'SELECT * FROM services'
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'something went wrong in services..'
            })
        }
        res.status(200).json({
            dara: result,
            count: result.length
        })
    })
}
module.exports = {
    servicesController
}