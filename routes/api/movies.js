const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Movie model
const Movie = require("../../Models/Movie");
const Profile = require("../../Models/Profile");

// Vaidation
const validateMovieInput = require("../../validation/movie");

// @route GET api/movies/test
// @desc Tests movies route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Movies works" });
});

// @route GET api/movies/
// @desc GET movies
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movie.find()
      .then(movies => res.json(movies))
      .catch(err => res.status(404).json({ nomoviefound: "No movies found" }));
  }
);

// @route GET api/movies/:id
// @desc GET movies
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movie.findById(req.params.id)
      .then(movie => res.json(movie))
      .catch(err =>
        res.status(404).json({ nomoviefound: "No movie found with that id" })
      );
  }
);

// @route POST api/movies/
// @desc Create movie
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMovie = new Movie({
      adult: req.body.adult,
      backdrop_path: req.body,
      movie_id: req.body.id,
      original_language: req.body.original_language,
      original_title: req.body.original_title,
      overview: req.body.overview,
      popularity: req.body.popularity,
      poster_path: req.body.poster_path,
      release_date: req.body.release_date,
      title: req.body.title,
      video: req.body.video,
      vote_average: req.body.vote_average,
      vote_count: req.body.vote_count
    });
    newMovie.save().then(movie => res.json(movie));
  }
);

// @route DELETE api/movies/:id
// @desc Delete movie
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Movie.findById(req.params.id).then(movie => {
        // Check for post owner
        if (movie.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        movie
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ movienotfound: "no movie found" })
          );
      });
    });
  }
);

module.exports = router;
