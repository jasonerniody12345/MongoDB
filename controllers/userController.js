const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


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
            // console.log(err.errors.age)
            if(err.errors.age) {
                res.status(400).json({
                    message: err.errors.age.message
                })
            }
            else if (err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            }
            else if (err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            }
            else {
                res.status(500).json({
                    message: "Internal server error"
                })
            }
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
    },

    register (req, res) {
        User.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password
        })
        .then(register => {
            console.log("successfully registered user")
            res.status(201).json({
                message: "sucessfully registered user",
                register
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
    },

    login (req, res) {
        User.find(req.boy.email, {
        })
        .then(login => {
            if (password == true) {
                const token = jwt.sign ({...result[0]}, memek)
                console.log("successfuly login")
                res.status(201).json({
                    message: "sucessfully login",
                    accessToken: token
                })
            }
        })
        .catch(err => {
            console.log(err)
            if (err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            }
            else if (err.errors.password) {
                res.status(400).json({
                    message: err.erors.password.message
                })
            }
        })

    }

}