const express = require('express')
const todoController = require('../controllers/todoController')
const verify = require("../middleware/verify")
const router = express.Router()


router.get("/getTodo/:id", todoController.get)
router.get("/getAllTodo", todoController.getTodo)
router.post("/create", verify.authenticate, todoController.create)
router.put("/update/:id", verify.authenticate, verify.authorize, todoController.update)
router.put("/addTag/:id", verify.authenticate, verify.authorize, todoController.addTag)
router.delete("/delete/:id", verify.authenticate, verify.authorize, todoController.delete)

module.exports = router