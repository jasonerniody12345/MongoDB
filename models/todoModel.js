const mongoose = require("mongoose")
const { Schema } = mongoose

const todoSchema = new mongoose.Schema ({
    name: {
        type: String,
        validate: {
            validator: function(name) {
                return name.length > 3
            },
            message: "Please input a longer todo name"
        }
    },
    description: {
        type: String,
        validate: {
            validator: function(description) {
                return description.length > 3
            },
            message: "Please input a longer description"
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
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo