const env = require("dotenv")
env.config()

const bodyParser = require("body-parser")
const express = require("express")
const cors = require('cors')
const app = express()
const router  = express.Router()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jason:jason@cluster0.qd6sq.mongodb.net/Project1?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const user = require("./routes/user")
const todo = require("./routes/todo")

app.use(cors())
app.use("/users", user)
app.use("/todos", todo)

// app.listen (port, () => {
//     console.log("Listening" + " " + port)
// })

app.listen (port  , () => {
    console.log("Listening" + " " + port)
})
