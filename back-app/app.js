const express = require('express')
const app = express()
const cors = require('cors')
const { index, show } = require('./controller/propertiesController')
const port = process.env.PORT
const host = process.env.HOST

app.use(cors())

app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Benvenuto")
// })

app.listen(port, () => {
	console.log(`Server is running on ${host}:${port}`)
})

app.get('/api', index)
app.get('/api/:id', show)
