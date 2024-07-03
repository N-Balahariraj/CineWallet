const mongoose = require('mongoose')

const movies = new mongoose.Schema({
    title : String,
    desc : String,
    actors : String,
    director : String,
    genre : String
})

const moviesModel = mongoose.model("Movies",movies)

module.exports = moviesModel