const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get("/",  userController.get)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/create", userController.create)
router.put("/update/:id", userController.update)
router.delete("/delete/:id", userController.delete)

module.exports = router