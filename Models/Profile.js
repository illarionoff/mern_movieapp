const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  sex: {
    type: String
  },
  location: {
    type: String
  },
  social: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  movies: [
    {
      adult: {
        type: Boolean
      },
      backdrop_path: {
        type: String
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
