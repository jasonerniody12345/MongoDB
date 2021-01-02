const express = require('express')
const todoController = require('../controllers/todoController')
const verify = require("../middleware/verify")
const router = express.Router()


router.get("/:id", todoController.get)
router.post("/create", verify.authenticate, todoController.create)
router.put("/update/:id", verify.authenticate, todoController.update)
router.delete("/delete/:id", verify.authenticate, todoController.delete)

module.exports = router