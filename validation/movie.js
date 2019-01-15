const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMovieInput(data) {
  let errors = {};

  // Validate text
  data.title = !isEmpty(data.title) ? data.title : "";
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  // Validate overview
  data.overview = !isEmpty(data.overview) ? data.overview : "";
  if (Validator.isEmpty(data.overview)) {
    errors.overview = "Overview is required";
  }

  // Validate release
  data.release = !isEmpty(data.release) ? data.release : "";
  if (Validator.isEmpty(data.release)) {
    errors.release = "Release is required";
  }

  // Validate comment
  data.comment = !isEmpty(data.comment) ? data.comment : "";
  if (Validator.isEmpty(data.comment)) {
    errors.comment = "Comment is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
