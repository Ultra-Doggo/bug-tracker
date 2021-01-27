const Task = require('../models/task')

exports.getTasks = (req, res) => {
    const tasks = Task.find().select("_id title description")
        .then(tasks => {
            res.status(200).json({ tasks: tasks })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createTask = (req, res) => {
    const task = new Task(req.body)
    // console.log("Creating task: " + task)
    // console.log("Task body: " + req.body)
    task.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            task: result
        })
    })
}