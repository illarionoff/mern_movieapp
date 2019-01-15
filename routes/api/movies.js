const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Movie model
const Movie = require("../../Models/Movie");

// Vaidation
const validateMovieInput = require("../../validation/movie");

// @route GET api/movies/test
// @desc Tests movies route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Movies works" });
});

// @route POST api/movies/
// @desc Create movie
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMovieInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMovie = new Movie({
      title: req.body.title,
      overview: req.body.overview,
      release: req.body.release,
      comment: req.body.comment,
      user: req.user.id
    });
    newMovie.save().then(movie => res.json(movie));
  }
);

module.exports = router;
