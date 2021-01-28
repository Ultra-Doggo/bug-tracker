const express = require('express')
const {getUser, updateUser, allUsers, userById} = require('../controllers/user')
const { requireLogin } = require('../controllers/userAuth')


const router = express.Router()

router.get('/users', allUsers)
router.get('/user/:userId', requireLogin, getUser)
router.put('/user/:userId', requireLogin, updateUser)

router.param("userId", userById)

module.exports = router