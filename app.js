const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const router  = express.Router()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jason:jason@cluster0.qd6sq.mongodb.net/Project1?retryWrites=true&w=majority")

const user = require("./routes/user")

app.use("/users", user)

app.listen (port, () => {
    console.log("Listening" + port)
})