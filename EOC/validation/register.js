const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";
  data.enforcementOfficer = !isEmpty(data.enforcementOfficer) ? data.enforcementOfficer : "";
  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }
   // Name checks
   if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }
    // contactNo checks
   if (Validator.isEmpty(data.contactNo)) {
    errors.contactNo = "Contact number field is required";
  }
   // enforcementOfficer checks
   if (Validator.isEmpty(data.enforcementOfficer)) {
    errors.enforcementOfficer = "Select yes or no";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
