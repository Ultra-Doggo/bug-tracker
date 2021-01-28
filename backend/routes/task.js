const express = require('express')
const {
    getTasks, 
    tasksByUser, 
    taskById, 
    createTask,
    isSubmitter,
    deleteTask
} = require('../controllers/task')
const {userById} = require('../controllers/user')
const {requireLogin} = require('../controllers/userAuth')
const {createTaskValidator} = require('../validation')

const router = express.Router()

router.get('/', requireLogin, getTasks)
router.post('/new/task/:userId', requireLogin, createTask, createTaskValidator)
router.get('/tasks/by/:userId', tasksByUser)
router.delete('/task/:taskId', requireLogin, isSubmitter, deleteTask)

router.param("userId", userById)
router.param("taskId", taskById)


module.exports = router