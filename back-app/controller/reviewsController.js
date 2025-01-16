const connection = require("../db/connection.js");

// Metodo per mostrare le recensioni relative ad un appartamento
function reviewsShow(req, res) {
    const id = req.params.id_property
    const sqlShow = `SELECT * FROM reviews WHERE id_property=? order by date_review desc`

    connection.query(sqlShow, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Something went wrong... '
            })
        }
        res.status(200).json({
            reviews: result,
            count: result.length
        })
    })
}

// Metodo per aggiungere una recensione
function reviewCreate(req, res) {
    const sql = `INSERT INTO reviews (id_property, name, text_review, nights, date_review) VALUES (?, ?, ?, ?, ?)`
    const sqlShow = `SELECT * FROM reviews WHERE id_property=? order by date_review desc`
    const idName = req.params.name;
    const idProperty = req.params.id_property;
    const date = new Date();

    const { text_review, nights } = req.body
    if (!text_review || !nights)
        return res.status(400).json({
            error: "Some fields are missing!"
        })
    if (!Number(nights) || nights <= 0) {
        return res.status(400).json({
            error: "Nights must be a positive number!"
        });
    }
    if (text_review.length < 10) {
        return res.status(400).json({
            error: "Your review must be longer..."
        })
    }

    connection.query(sql, [idProperty, idName, text_review, nights, date], (err, result) => {
        if (err) {
            res.status(500).json({
                err: "Something went wrong...1"
            })
        } else {
            connection.query(sqlShow, [idProperty], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: 'Something went wrong...2 '
                    })
                }
                res.status(200).json({
                    reviews: result,
                    success: true,
                    message: "Review added successfully"
                })
            })

        }
    })
}

module.exports = {
    reviewsShow,
    reviewCreate
}