const moviesModel = require("../models/movie.model");

exports.create = (req, res) => {
  const { title, desc, actors, director, genre } = req.body;
  const newMovie = new moviesModel({ title, desc, actors, director, genre });

  moviesModel.findOne({ title: title }).then((result) => {
    if (result) {
      res.status(403).json({ message: "The movie already exist" });
      return;
    }

    newMovie
      .save()
      .then((result) => {
        if (!result) res.status(400).json({ message: "Something went wrong" });
        res.status(200).send(result);
      })
      .catch((err) =>
        res.status(500).send({ message: "Server not available", error: err })
      );
  });
};

exports.read = (req, res) => {
  moviesModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        status: "failure",
        message: "could not fetch details",
        error: err,
      });
    });
};

exports.delete = (req, res) => {
  const title = req.params.title;
  moviesModel
    .findOneAndDelete({ title: title })
    .then((result) => {
      res
        .status(200)
        .json({status:200, message: "The movie was removed successfully", data: result });
    })
    .catch((e) => {
      res.status(500).json({status:500, message: "something went wrong :{ ", error: e });
    });
};

exports.update = (req, res) => {
  const oriTitle = req.params.title;
  const { title, desc, actors, director, genre } = req.body;
  moviesModel
    .findOneAndUpdate(
      { title: oriTitle },
      {
        $set: {
          title,
          desc,
          actors,
          director,
          genre,
        },
      },
    )
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Movie details updated successfully :)",
        result: result,
      });
    })
    .catch((e) => {
      res
        .status(500)
        .json({status:500, message: "Unable to update the movie details", err: e });
    });
};
