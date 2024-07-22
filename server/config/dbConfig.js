const mongoose = require('mongoose')

const dbUrl = process.env.DATABASE_URL

exports.ConnectToDb = async () =>{
    try{
        await mongoose.connect(dbUrl) 
        console.log("DB Connection established ;)")
    }
    catch(e){
        console.log("DB Connection Couldn't be established")
        console.log("err :", e)
    }
}
