const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {

    create (req, res) {
        User.create({
            name: req.body.name,
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
            // console.log(err.errors.age)
            if (err.errors.name) {
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
            console.log("displaying all the listed users")
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
        // console.log(req.body)
        User.create({
            name: req.body.name,
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
        // console.log(req.body.email)
        // console.log(req.body)
        User.findOne({email: req.body.email})
        .then(userInfo => {
            // console.log(userInfo.password)
            // console.log(bcrypt.compareSync(req.body.password, userInfo.password))
            if (bcrypt.compareSync(req.body.password, userInfo.password) === true) {
                const token = jwt.sign ({...userInfo}, process.env.KEY)
                console.log("successfuly login")
                res.status(201).json({
                    message: "sucessfully login",                   
                    accessToken: token
                })
            }
            else {
                console.log(bcrypt.compareSync(req.body.password, userInfo.password))
                console.log(userInfo)
                console.log(req.body)
                res.status(401).json({
                    message: "password or email is invalid"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "internal server error"
            })   
        })
    },

    verify (req, res) {
        try {
            const key = jwt.verify(req.headers.token, process.env.KEY)
            res.status(200).json({
                message: "authenticated"
            })
        }
        catch (err) {
            res.status(401).json({
                message: "unauthenticated"
            })
        }
    }

}