const connection = require("../db/connection.js");

// Metodo per mostrare le recensioni relative ad un appartamento
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

// Metodo per aggiungere una recensione
function reviewCreate(req, res) {
    const sql = `INSERT INTO reviews (id_user, id_property, text_review, date_review, nights) VALUES (?, ?, ?, ?, ?)`
    const idUser = req.params.id_user;
    const idProperty = req.params.id_property;
    const date = new Date();

    const { text_review, nights } = req.body
    connection.query(sql, [idUser, idProperty, text_review, date, nights], (err, result) => {
        if (!text_review || !nights)
            return res.status(400).json({
                error: "Some fields are missing!"
            })
        if (err) {
            res.status(500).json({
                err: "Something went wrong..."
            })
        }
        res.status(200).json({
            success: true
        })
    })
}

module.exports = {
    reviewsShow,
    reviewCreate
}