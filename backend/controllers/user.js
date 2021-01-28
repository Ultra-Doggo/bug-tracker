const User = require('../models/user')
const _ = require('lodash')

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            users: users
        })
    }).select("firstName lastName email")
}

exports.getUser = (req, res) => {
    return res.status(200).json(req.profile)
}

exports.updateUser = (req, res) => {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "User is not authorized to perform this action."
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.status(200).json({user: user})
    })
}

exports.deleteUser = (req, res) => {
    let user = req.profile
    user.remove((err, user) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            message: "User successfully deleted."
        })
    })
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found."
            })
        }
        req.profile = user
        next()
    })
}

exports.hasAuthorization = (req, res) => {
    const authorized = 
        req.profile && req.auth && req.profile._id === req.auth._id

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action."
        })
    }
}