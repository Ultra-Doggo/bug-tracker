const express = require('express')
const {
    getTasks, 
    tasksByUser, 
    taskById, 
    createTask,
    isSubmitter,
    deleteTask,
    updateTask,
    singleTask
} = require('../controllers/task')
const {userById} = require('../controllers/user')
const {requireLogin} = require('../controllers/userAuth')
const {createTaskValidator} = require('../validation')

const router = express.Router()

router.get('/tasks/all', requireLogin, getTasks)
router.get('/task/:taskId', requireLogin, singleTask)
router.post('/task/new/:userId', requireLogin, createTask, createTaskValidator)
router.get('/tasks/by/:userId', tasksByUser)
router.delete('/task/:taskId', requireLogin, isSubmitter, deleteTask)
router.put('/task/:taskId', requireLogin, isSubmitter, updateTask)


router.param("userId", userById)
router.param("taskId", taskById)


module.exports = router