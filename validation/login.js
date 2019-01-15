const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Validate email
  data.email = !isEmpty(data.email) ? data.email : "";
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  // Validate password
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
