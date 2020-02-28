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
  isAdmin: {
    type: Boolean,
    default: false
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
  },
  resetPasswordToken:{
    type: String, 
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }
  });
module.exports = User = mongoose.model("users", UserSchema);