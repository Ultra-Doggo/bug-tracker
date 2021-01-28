const User = require('../models/user')

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

exports.hasAuthorization = (req, res, next) => {
    const authorized = 
        req.profile && req.auth && req.profile._id === req.auth._id

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action."
        })
    }
}