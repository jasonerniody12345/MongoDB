const mongoose = require("mongoose")
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

userSchema.pre("save", async function(next) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(salt)
    }
    catch(error){
        next(error)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User