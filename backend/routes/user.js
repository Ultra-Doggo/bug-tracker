const express = require('express')
const {
    getUser, 
    updateUser, 
    deleteUser, 
    allUsers, 
    userById
} = require('../controllers/user')
const { requireLogin } = require('../controllers/userAuth')


const router = express.Router()

router.get('/users', allUsers)
router.get('/user/:userId', requireLogin, getUser)
router.put('/user/:userId', requireLogin, updateUser)
router.delete('/user/:userId', requireLogin, deleteUser)

router.param("userId", userById)

module.exports = router