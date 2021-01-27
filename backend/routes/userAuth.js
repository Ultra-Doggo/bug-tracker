const express = require('express')
const { register, login } = require('../controllers/userAuth')
const { registrationValidator } = require('../validation')

const router = express.Router()

router.post('/register', registrationValidator, register)
router.post('/login', login)

module.exports = router