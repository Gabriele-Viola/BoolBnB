const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT
const host = process.env.HOST
const connection = require("./db/connection.js");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto")
})



app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);

})