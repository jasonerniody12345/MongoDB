const User = require("../models/userModel")

module.exports = {

    create (req, res) {
        User.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password
        })
        .then(createUser => {
            console.log("sucessfully registered new user")
            res.status(201).json({
                message: "sucessfully registered new user",
                createUser
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    update (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password
        })
        .then(updateUser => {
            console.log("successfully updated user")
            res.status(201).json({
                message: "sucessfully updated user"
            })
        })
    },

    delete (req, res) {
        User.findByIdAndDelete(req.params.id, {
        })
        .then(deleteUser => {
            console.log("succesfully deleted user")
            res.status(201).json({
                message: "sucessfully deleted user",
                deleteUser
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
        User.find({
        })
        .then(getUser => {
            console.log("displaying the listed users")
            res.status(201).json({
                getUser
            })
        })
        .catch(err => {
            console.log("Interal server erro")
            res.status(500).json({
                message: "Internal server error"
            })
        })
    }



}