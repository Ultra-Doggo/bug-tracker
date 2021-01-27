const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("CONNECTED TO DATABASE"))

mongoose.connection.on('error', err => {
    console.log(`DB Connection Error: ${err.message}`)
})

// bring in routes:
const taskRoutes = require('./routes/task')
const userAuthRoutes = require('./routes/userAuth')


// middleware:
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/', taskRoutes)
app.use('/', userAuthRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`API listening on port ${port}`))
