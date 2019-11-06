const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateIncidentInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.incidentName = !isEmpty(data.incidentName) ? data.incidentName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.dateAndTime = !isEmpty(data.dateAndTime) ? data.dateAndTime : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  // Name checks
  if (Validator.isEmpty(data.incidentName)) {
    errors.incidentName = "Incident Name field is required";
  }
   // address checks
   if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
    // dateandtime checks
   if (Validator.isEmpty(data.dateAndTime)) {
    errors.dateAndTime = "Date and time field is required";
  }
   // description checks
   if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
