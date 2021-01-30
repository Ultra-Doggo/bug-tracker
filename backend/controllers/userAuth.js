const User = require('../models/user')
const Organization = require('../models/organization')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()

exports.register = async (req, res) => {
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) {
        return res.status(403).json({
            error: "A user with this email already exists."
        })
    }
    const organizationExists = await Organization.findOne({code: req.body.key})
    if (!organizationExists) {
        return res.status(403).json({
            error: "Organization key not found."
        })
    }

    const user = await new User(req.body)
    user.orgId = organizationExists._id

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
        if (!user.authenticatePassword(password)) {
            return res.status(401).json({
                error: "Email and password do not match."
            })
        }
        // generate token for local storage
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie("t", token, {expire: new Date() + 3600})

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