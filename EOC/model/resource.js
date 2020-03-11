const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ResourceSchema = new Schema({
  typeOfResource: {
    type: String,
    required: true
  },
  subtype: {
    type: String,
    required: true
  },
  resourceName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  contactnumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Available"
  }
});
module.exports = Resource = mongoose.model("resource", ResourceSchema);