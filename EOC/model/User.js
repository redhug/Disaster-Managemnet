const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  medicalCertification: {
    type: String
  },
  enforcementOfficer: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("users", UserSchema);