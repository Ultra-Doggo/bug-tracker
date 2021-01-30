const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')
const {ObjectId} = mongoose.Schema


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
    hashed_key: {
        type: String,
        trim: true,
        required: true
    },
    orgId: {
        type: ObjectId,
        ref: "Organization"
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
    this.hashed_password = this.encrypt(password)
})
.get(function() {
    return this._password
})

// treat key as a virtual field
userSchema.virtual('key')
.set(function(key) {
    this._key = key
    this.salt = uuidv1()
    this.hashed_key = this.encrypt(key)
})
.get(function() {
    return this._password
})

// method for encrypting password & organization key
userSchema.methods = {
    encrypt: function(field) {
        if (!field) return ""
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(field)
                .digest('hex')
        } catch (err) {
            return ""
        }
    },
    authenticatePassword: function(plainText) {
        return (
            this.encrypt(plainText) === this.hashed_password
        ) 
    },
    authenticateOrganization: function(plainText) {
        return (
            this.encrypt(plainText) === this.hashed_key
        ) 
    }
}

module.exports = mongoose.model("User", userSchema)