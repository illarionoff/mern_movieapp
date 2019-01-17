const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Validate handle
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  // Validate sex
  data.handle = !isEmpty(data.sex) ? data.handle : "";

  // Validate location
  data.handle = !isEmpty(data.location) ? data.handle : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  if (Validator.isEmpty(data.sex)) {
    errors.sex = "Sex is required";
  }

  //   Social validator
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
