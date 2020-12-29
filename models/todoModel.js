const mongoose = require("mongoose")
const { Schema } = mongoose
const today = new Date()

const todoSchema = new mongoose.Schema ({
    name: {
        type: String,
        validate: {
            validator: function(name) {
                return name.length > 3
            },
            message: "Please input your valid todo name"
        }
    },
    description: {
        type: String,
        validate: {
            validator: function(description) {
                return description.length > 3
            },
            message: "Please input a valid description"
        }
    },
    status: {
        type: Boolean,
    },
    startDate: {
        type: Date,
        default: Date.now

    },
    dueDate: {
        type: String,
        validate: {
            validator: function(dueDate) {
                return dueDate.length > 6
            },
            message: "Please input a valid date format DD/MM/YY"
        }
    }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo