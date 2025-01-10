const express = require('express')
const app = express()
const routerProp = require('./routers/router')
const cors = require('cors')
const { index, show, create } = require('./controller/propertiesController')
const { reviewsShow } = require('./controller/reviewsController')
const port = process.env.PORT
const host = process.env.HOST


app.use(cors())

app.use(express.json())
app.use("/api", routerProp)

// app.get("/", (req, res) => {
//     res.send("Benvenuto")
// })

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`)
})

