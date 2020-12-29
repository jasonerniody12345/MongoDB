const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()
const userController = require('../controllers/todoController')

router.get("/:id", todoController.get)
router.post("/create", todoController.create)
router.put("/update/:id", todoController.update)
router.delete("/delete/:id", todoController.delete)

module.exports = router