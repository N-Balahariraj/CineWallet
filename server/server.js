// Imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Creating App
const app = express()
app.use(bodyParser.json())
app.use(cors())

// DB Connection
async function ConnectToDb(){
    try{
        await mongoose.connect("mongodb+srv://N-Balahariraj:1sdHLRnpjHN0iopD@cluster0.jrjjd5q.mongodb.net/") 
        console.log("DB Connection established ;)")

        const Port = 4500
        app.listen(Port,()=>{
            console.log(`Listening the server at port ${Port}...`)
        })
    }
    catch(e){
        console.log("DB Connection Couldn't be established")
    }
}

ConnectToDb()

require('./routes/movie.routes.js')(app);