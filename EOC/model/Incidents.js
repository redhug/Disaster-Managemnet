const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const IncidentsSchema = new Schema({
  incidentName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  });
module.exports = Incidents = mongoose.model("incidents", IncidentsSchema);