const Task = require('../models/task')
const formidable = require('formidable')
const fs = require('fs')

exports.getTasks = (req, res) => {
    const tasks = Task.find()
        .populate("submittedBy", "_id firstName lastName")
        .select("_id title description")
        .then(tasks => {
            res.status(200).json({ tasks: tasks })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.tasksByUser = (req, res) => {
    Task.find({submittedBy: req.profile._id})
        .populate("submittedBy", "_id firstName lastName")
        .sort("_created")
        .exec((err, tasks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(tasks)
        })
}

exports.createTask = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({
                error: "Image could not be uploaded."
            })
        }
        let task = new Task(fields)
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        task.submittedBy = req.profile
        if (files.photo) {
            task.photo.data = fs.readFileSync(files.photo.path)
            task.photo.contentType = files.photo.type
        }
        task.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })
}