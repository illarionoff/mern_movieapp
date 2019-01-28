const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  adult: {
    type: Boolean
  },
  movie_id: {
    type: String,
    required: true
  },
  original_language: {
    type: String
  },
  original_title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    required: true
  },
  poster_path: {
    type: String
  },
  release_date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  video: {
    type: Boolean
  },
  vote_average: {
    type: Number
  },
  vote_count: {
    type: Number
  }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
