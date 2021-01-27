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