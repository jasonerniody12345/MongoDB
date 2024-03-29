const Todo = require("../models/todoModel")

module.exports = {

    create (req, res) {
        console.log(req.userID)
        Todo.create({
            user: req.userID,
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
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
        // console.log("-----------",req.body)
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

    getByUserId (req, res) {
        console.log(req.params)
        console.log(req.userID)
        Todo.find({
            user: req.userID
        })
        .populate("user")
        .then(getOne => {
            console.log("displaying the specific todo list" + getOne)
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
    },

    getTodo (req, res) {
        Todo.find({
        })
        .then(getTodo => {
            console.log("displaying all the listed todos")
            res.status(201).json({
                getTodo
            })
        })
        .catch(err => {
            console.log("Interal server erro")
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    addTag (req, res) {
        Todo.findByIdAndUpdate(req.params.id, {
            $push: {
                tags: req.body.tag
            } 
        }, {new: true})
    .then (addTag=> {
        res.status(200).json({
           addTag 
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    })
    }
}