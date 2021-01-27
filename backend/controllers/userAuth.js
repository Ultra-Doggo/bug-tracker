const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

exports.register = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
        return res.status(403).json({
            error: "A user with this email already exists."
        })
    }
    const user = await new User(req.body)
    await user.save()
    // res.status(200).json({user}) // all user data

    // more secure just to send successful message:
    res.status(200).json({
        "message": "Successful registration! Please login."
    })
}

exports.login = (req, res) => {
    // destructure email and password from the request
    const {email, password} = req.body
    // query DB to find user with this email
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email address does not exist."
            })
        }
        // use schema method to ensure passwords match
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and/or password do not match."
            })
        }
        // generate token for local storage
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie("t", token, {expire: new Date() + 3600})

        const {_id, name, email} = user
        return res.json({
            token,
            user: user
        })
    })
}

exports.logout = (req, res) => {
    res.clearCookie("t")
    return res.json({
        message: "Successful logout."
    })
}

exports.requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})