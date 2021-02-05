const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const taskSchema = new mongoose.Schema({
    // define what a task must consist of here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    submittedBy: {
        type: ObjectId,
        ref: "User"
    },
    orgId: {
        type: ObjectId,
        ref: "Organization"
    },
    created: {
        type: Date,
        default: Date.now
    }
    // TODO: add more properties - assignedTo, status, updated, etc...
})

module.exports = mongoose.model("Task", taskSchema)