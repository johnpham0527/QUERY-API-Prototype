const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const logger = require("morgan")
const routes = require("./routes")
const path = require("path")

const app = express()

express.static("/")

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())
app.use(logger("dev"))
app.use("/api", routes)

module.exports = app