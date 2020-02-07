const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ResourceSchema = new Schema({
  TypeofResource: {
    type: String,
    required: true
  },
  Resourcesubtype: {
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
  zipcode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  resourceMobileNumber: {
    type: Number,
    required: true
  },
  resourceEmail: {
    type: String,
    required: true
  }
});
module.exports = Resource = mongoose.model("Resources", ResourceSchema);