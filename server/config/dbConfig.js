const mongoose = require('mongoose')

exports.ConnectToDb = async () =>{
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
