const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    // define what a task must consist of here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    }
    // TODO: add more properties - assignedTo, submittedBy, status, created, updated, etc...
})

module.exports = mongoose.model("Task", taskSchema)