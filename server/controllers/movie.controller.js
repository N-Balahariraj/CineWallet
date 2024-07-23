const moviesModel = require("../models/movie.model");
const userModal = require("../models/user.model");

exports.create = async (req, res) => {
  const { title, desc, actors, director, genre } = req.body;

  try {
    const user = await userModal.findById(req.user.id);
    if (user.movies.includes(title)) {
      res.status(409).send({ message: "The movie already exist" });
      return;
    }
    const movie = await moviesModel.findOne({title})
    if(!movie){
      const newMovie = await moviesModel.create({
        title,
        desc,
        actors,
        director,
        genre,
      });
      if (!newMovie) {
        res
          .status(500)
          .send({ message: "Server error, unable to add movie try again later" });
        return;
      }
    }
    
    user.movies.push(title);
    const movieStatus = await user.save();
    res
      .status(200)
      .send({ message: "Movie saved successfully", result: movieStatus });
  } 
  
  catch (error) {
    console.log("err : ", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
};

exports.read = async (req, res) => {
  
  try {
    const user = await userModal.findById({_id : req.user.id})
    if(!user || !user.movies){
      res.status(500).send({message : "Server error"})
      return;
    }
    const movies = await moviesModel.find({title:{$in : user.movies}})
    if(!movies){
      res.status(500).send({message : "Server error"})
      return;
    }
    res.status(200).send({message : "Movies retrieved successfully", result : movies})
  } 
  catch (error) {
    console.log("err : ",error)
    res.status(500).send({message: "Server error"})
  }
};

exports.update = async (req, res) => {
  const oriTitle = req.params.title;
  const { title, desc, actors, director, genre } = req.body;

  try {
    const result = await moviesModel.findOneAndUpdate(
      { title: oriTitle },
      { $set: { title, desc, actors, director, genre } },
      { new: true } 
    );
    if (!result) {
      res.status(500).send({ message: "Server error" });
      return;
    }
    res.status(200).send({ message: "Movie details updated successfully :)", result : result });
  } 
  
  catch (error) {
    console.log("err : ",error)
    res
      .status(500)
      .json({ message: "Server error", err: error });
  }
};

exports.delete = async (req, res) => {
  const title = req.params.title;
  const userId = req.user.id
  
  try {
    const user = await userModal.findById({_id:userId})
    if(!user){
      res.status(500).send({message : "Server error"})
      return;
    }
    const movieIndex = user.movies.indexOf(title)
    if(movieIndex === -1){
      res.status(404).send({message : "The movie does not exist"})
      return;
    }
    const deletedMovies =user.movies.splice(movieIndex,1)
    if(!deletedMovies){
      res.status(500).send({message : "Server error"})
      return;
    }
    const movieStatus = await user.save()
    res.status(200).send({message : "Movie deleted successfully", result : [deletedMovies, movieStatus]})
  } 
  
  catch (error) {
    console.log("err : ",error)
    res.status(500).send({message : "Server error"})
  }
};
