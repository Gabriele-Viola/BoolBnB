const connection = require("../db/connection.js");

function reviewsShow(req, res) {
    const id = req.params.id_property
    const sql = `SELECT * FROM reviews WHERE id_property=?`

    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        res.status(200).json({
            reviews: result
        })
    })
}

module.exports = {
    reviewsShow
}