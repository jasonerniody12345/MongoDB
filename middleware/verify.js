const jwt = require("jsonwebtoken")
const Todo = require("../models/todoModel")

module.exports = {

    authenticate (req, res, next) {
        
        try {
            const key = jwt.verify(req.headers.token, "memek")
            req.userID = key._doc._id
            // console.log(key._doc._id)
            next()

        }
        catch(err){
            res.status(401).json({
                message: "unauthenticated"
            })
        }
    },

    authorize (req, res, next) {

        try {
            Todo.findById(req.params.id, {
            })
            .then(todoData => {
                const access = jwt.verify(req.headers.token, "memek")
        // cara ngecek datatype  // console.log(typeof todoData.user)
                // console.log(typeof access._doc._id)
                if (String(todoData.user) === access._doc._id) {
                    next()
                } 
                else {   
                    res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            })
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                message: "internal server error"
            })

        }
    }

}