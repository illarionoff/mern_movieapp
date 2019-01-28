const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// User model
const User = require("../../Models/User");
// JWT Secret or Key
const secret = require("../../config/keys").secretOrKey;

// Movie Schema
const Movie = require("../../Models/Movie");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users works" });
});

// @route POST api/users/register
// @desc Register new user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        // Documentation https://github.com/emerleite/node-gravatar
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user / Return JWT
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email: email })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          // Create JWT payload
          const payload = {
            id: user._id,
            name: user.name,
            avatar: user.avatar
          };

          // Sign Token
          jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          return res.status(400).json({ password: "password incorrect" });
        }
      });
    })
    .catch();
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route DELETE api/users/
// @desc Return current user
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  }
);

// @route GET api/users/movies/all
// @desc Return all movies
// @access Private
router.get(
  "/movies/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user);
    res.json({
      movies: req.user.movies
    });
  }
);

// @route POST api/users/movies/all
// @desc Add new movie
// @access Private
router.post(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMovie = new Movie({
      adult: req.body.adult,
      backdrop_path: req.body.backdrop_path,
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

    // console.log(newMovie);
    req.user.movies.unshift(newMovie);
    req.user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
);

// @route DELETE api/users/movies/:movie_id
// @desc Delete single movie
// @access Private
router.delete(
  "/movies/:movie_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .then(user => {
        //  Get remove index
        const removeIndex = user.movies
          .map(movie => movie.movie_id)
          .indexOf(req.params.movie_id);
        // Splice out of array
        user.movies.splice(removeIndex, 1);
        // Save
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
