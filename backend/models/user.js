const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date

})

// treat password as a virtual field
userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

// method for encrypting password
userSchema.methods = {

    encryptPassword: function(password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ""
        }
    }

}

module.exports = mongoose.model("User", userSchema)