// Imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const DbConnection = require('./config/dbConfig.js')

// Creating App
const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin : ["https://cinewallet.netlify.app","http://localhost:3000"],
    credentials : true
}))
app.set("trust proxy",1)
app.use(cookieParser())
require('dotenv').config();

// DB Connection
DbConnection.ConnectToDb()

// Initialize the app to listen at port
const PORT = process.env.PORT
app.listen(PORT || 4500,()=>{
    console.log(`Listening the server at port ${PORT}...`)
})

require('./routes/user.routes.js')(app);
require('./routes/movie.routes.js')(app);

