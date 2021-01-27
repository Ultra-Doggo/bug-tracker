const express = require('express')
const { register } = require('../controllers/userAuth')
// const { registrationValidator } = require('../validation')

const router = express.Router()

router.post('/register', register)

module.exports = router