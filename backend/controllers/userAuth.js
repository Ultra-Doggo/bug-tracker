const User = require('../models/user')

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