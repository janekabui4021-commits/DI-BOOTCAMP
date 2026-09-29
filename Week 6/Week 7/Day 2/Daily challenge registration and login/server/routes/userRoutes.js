const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.getAll)
router.get('/users/:id', userController.getById)
router.put('/users/:id', userController.update)

module.exports = router