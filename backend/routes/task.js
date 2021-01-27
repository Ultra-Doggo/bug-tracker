const express = require('express')
const {getTasks, createTask} = require('../controllers/task')
const {createTaskValidator} = require('../validation')

const router = express.Router()

router.get('/', getTasks)
router.post('/create-task', createTaskValidator, createTask)

module.exports = router