const Task = require('../models/task')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.getTasks = (req, res) => {
    const tasks = Task.find()
        .populate("submittedBy", "_id firstName lastName")
        .select("_id title description created")
        .sort({created: -1})
        .then(tasks => {
            res.status(200).json(tasks)
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

exports.singleTask = (req, res) => {
    return res.json(req.task)
}

exports.taskById = (req, res, next, id) => {
    Task.findById(id)
    .populate("submittedBy", "_id firstName lastName")
    .exec((err, task) => {
        if (err || !task) {
            res.status(400).json({
                error: err
            })
        }
        req.task = task
        next()
    })
}

exports.createTask = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        let task = new Task(fields)
        req.profile.pwSalt = undefined
        req.profile.keySalt = undefined
        req.profile.hashed_password = undefined
        req.profile.hashed_key = undefined
        req.profile.created = undefined

        task.submittedBy = req.profile
        task.orgId = req.profile.orgId  // adds organization id to this task
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

exports.isSubmitter = (req, res, next) => {
    let isSubmitter = 
        req.task && req.auth && req.task.submittedBy.id === req.auth._id
    if (!isSubmitter) {
        res.status(403).json({
            err: "User is not authorized to perform this action."
        })
    }
    next()
}

exports.deleteTask = (req, res) => {
    let task = req.task
    task.remove((err) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
    })
    res.json({
        message: "Task deleted."
    })
}

exports.updateTask = (req, res) => {
    let task = req.task
    task = _.extend(task, req.body)
    task.updated = Date.now()
    task.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(task)
    })
}