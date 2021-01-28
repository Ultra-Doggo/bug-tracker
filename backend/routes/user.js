const express = require('express')
const {getUser, allUsers, userById} = require('../controllers/user')

const router = express.Router()

router.get('/user/:userId', getUser)
router.get('/users', allUsers)

router.param("userId", userById)

module.exports = router