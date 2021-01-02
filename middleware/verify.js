  const jwt = require("jsonwebtoken")

module.exports = {

    authenticate (req, res, next) {
        
        try {
            const key = jwt.verify(req.headers.token, memek)
            next()
        }
        catch(err){
            res.status(401).json({
                message: "unauthenticated"
            })
        }
    },

    // authorize (req, res, next) {

    //     try {
    //        const access = jwt.verify(req.headers.token, memek)
    //        if (access.name === name) {
    //            next()
    //        } 
    //        else {   
    //            res.status(401).json({
    //                message: "Unauthorized"
    //            })
    //        }
    //     }
    //     catch(err){
    //         console.log(err)
    //         res.status(500).json({
    //             message: "internal server error"
    //         })

    //     }
    // }

}