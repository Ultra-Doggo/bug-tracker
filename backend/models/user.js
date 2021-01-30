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
    pwSalt: String,
    keySalt: String,
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
    this.pwSalt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

// treat key as a virtual field
userSchema.virtual('key')
.set(function(key) {
    this._key = key
    this.keySalt = uuidv1()
    this.hashed_key = this.encryptKey(key)
})
.get(function() {
    return this._key
})

// method for encrypting password & organization key
userSchema.methods = {
    encryptPassword: function(password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.pwSalt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ""
        }
    },
    authenticatePassword: function(plainText) {
        return (
            this.encryptPassword(plainText) === this.hashed_password
        ) 
    },

    encryptKey: function(key) {
        if (!key) return ""
        try {
            return crypto.createHmac('sha1', this.keySalt)
                .update(key)
                .digest('hex')
        } catch (err) {
            return ""
        }
    },
    authenticateKey: function(plainText) {
        return (
            this.encryptKey(plainText) === this.hashed_key
        ) 
    }
}

module.exports = mongoose.model("User", userSchema)