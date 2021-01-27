const express = require('express')
const { register, login, logout } = require('../controllers/userAuth')
const { registrationValidator } = require('../validation')
const {userById} = require('../controllers/user')

const router = express.Router()

router.post('/register', registrationValidator, register)
router.post('/login', login)
router.get('/logout', logout)

router.param("userId", userById)

module.exports = router