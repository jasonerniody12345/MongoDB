const Todo = require("../models/todoModel")

module.exports = {

    create (req, res) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            user: req.body.userId,
            dueDate: new Date(req.body.dueDate)
        })
        .then(createUser => {
            console.log("sucessfully registered new todo list")
            res.status(201).json({
                message: "sucessfully registered new todo list",
                createUser
            })
        })
        .catch(err => {
            // console.log(err)
            // console.log(err.errors.dueDate)
            if(err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            }
            else if (err.errors.description) {
                res.status(400).json({
                    message: err.errors.description.message
                })
            }
            // else if (err.errors.dueDate) {
            //     res.status(400).json({
            //         message: err.error.dueDate.message
            //     })
            // }
            else {
                console.log(err)
                res.status(500).json({
                    message: "Internal server error"
                })
            }
        })
    },

    update (req, res) {
        Todo.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate
        })
        .then(updateTodo => {
            console.log("successfully updated todo list")
            res.status(201).json({
                message: "sucessfully updated todo list",
                updateTodo
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    delete (req, res) {
        Todo.findByIdAndDelete(req.params.id, {
        })
        .then(deleteTodo => {
            console.log("succesfully deleted todo list")
            res.status(201).json({
                message: "sucessfully deleted todo list",
                deleteTodo
            })
        })
        .catch(err => {
            console.log("Internal server error")
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    get (req, res) {
        Todo.findById(req.params.id, {})
        .populate("user")
        .then(getOne => {
            console.log("displaying the specific todo list")
            res.status(201).json({
                getOne
            })
        })
        .catch(err => {
            if (err) {
                res.status(400).json({
                    message: "Please input the correct id number"
                })
            }
            else {
                console.log(err)
                res.status(500).json({
                    message: "Internal server error"
                })
            }
        })
    }

}