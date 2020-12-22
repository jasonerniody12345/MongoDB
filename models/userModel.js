const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        validate: {
            validator: function(name) {
                return name.length < 6
            },
            message: "Please input your fullname name "
        }
    },
    age: {
        type: Number,
        min: [18, "You are too young"]
    },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return email.length > 6
            },
            message: "Please input your valid email"
        }
    },
    password: String
})

const User = mongoose.model("User", userSchema)

module.exports = User