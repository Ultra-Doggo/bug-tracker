const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("Organization", organizationSchema)