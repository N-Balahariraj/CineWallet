// Imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dbConnection = require('./config')

// Creating App
const app = express()
app.use(bodyParser.json())
app.use(cors())

// DB Connection
dbConnection.connectToDb()

require('./routes/movie.routes.js')(app);
require('./routes/user.routes.js')(app)