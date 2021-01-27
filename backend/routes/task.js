const express = require('express')
const {getTasks, tasksByUser, createTask} = require('../controllers/task')
const {createTaskValidator} = require('../validation')
const {requireLogin} = require('../controllers/userAuth')
const {userById} = require('../controllers/user')


const router = express.Router()

router.get('/', requireLogin, getTasks)
router.post('/create-task/:userId', requireLogin, createTask, createTaskValidator)
router.get('/tasks-by/:userId', tasksByUser)

router.param("userId", userById)


module.exports = router