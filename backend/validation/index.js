exports.createTaskValidator = (req, res, next) => {
    // check that title is not empty
    req.check('title', 'Please write a title for this task.').notEmpty()
    // check that title is appropriate length
    req.check('title', 'Title must be between 5 and 140 characters.').isLength({
        min: 5,
        max: 140
    })

    // check that description is not empty
    req.check('description', 'Please write a description for this task.').notEmpty()
    // check that title is appropriate length
    req.check('description', 'Description must be between 5 and 2000 characters.').isLength({
        min: 5,
        max: 2000
    })

    // check for errors
    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    next()
}

exports.registrationValidator = (req, res, next) => {

    // organization key
    req.check('key', 'Please enter your organization\'s key.').notEmpty()

    // first and last name
    req.check('firstName', 'Please enter your first name.').notEmpty()
    req.check('firstName', 'First name must be between 2 to 20 characters.').isLength({
        min: 2,
        max: 20
    })
    req.check('lastName', 'Please enter your last name.').notEmpty()
    req.check('lastName', 'Last name must be between 2 to 20 characters.').isLength({
        min: 2,
        max: 20
    })

    // email
    req.check('email', 'Please enter your email address.').notEmpty()
    req.check('email', 'Email address must be between 4 to 32 characters')
    .matches(/.+\@.+\..+/)  // regex for email format
    .withMessage('Email must have valid format.')
    .isLength({
        min: 4, 
        max: 32
    })

    // password
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({
        min: 6
    })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)  // regex for needing a number... \d stands for digit
    .withMessage('Password must contain at least one number.')

    // checking for errors, sending back appropriate response
    const errors = req.validationErrors()
    // if there's errors, show the first
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    // continue onto the next middleware
    next()
}