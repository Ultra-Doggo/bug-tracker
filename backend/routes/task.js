const express = require('express')
const {getTasks, createTask} = require('../controllers/task')
const {createTaskValidator} = require('../validation')
const {requireLogin} = require('../controllers/userAuth')

const router = express.Router()

router.get('/', requireLogin, getTasks)
router.post('/create-task', createTaskValidator, createTask)

module.exports = router