const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { Schema } = mongoose

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        validate: {
            validator: function(name) {
                return name.length > 6
            },
            message: "Please input your full name"
        }
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
    password : {
        type: String,
        validate: {
            validator: function(login) {
                return login.length > 3
            },
            message: "Please input the correct password"
        }
    },
    register: {
        type: String,
        validate: {
            validator: function(register) {
                return register.length > 3
            },
            message: "Password is too short"
        }
    },
    //use beforeCreate & PreSave (hash)
})

userSchema.pre("save", function (next) {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.password, salt)
        this.password = hash 
        next()
    }
    catch(error){
        next(error)
    }
})
//suruh eltim ngajarin await and async
const User = mongoose.model("User", userSchema)

module.exports = User