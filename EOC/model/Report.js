const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
// Create Schema
const ReportSchema = new Schema({
  reportId:{
    type: Number, 
    default: 0, 
    unique: true
  },
  incidentId: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  typeOfIncident: {
    type: String,
  },
  levelOfImpact: {
    type: String,
  },
  hazmatType: {
    type: String,
  },
  notes: {
    type: String,
  },
  Casualities:{
        Red: { type: Number },
        Yellow: { type: Number },
        Green: { type: Number },
        Black: { type: Number }     
  }
  });
autoIncrement.initialize(mongoose.connection);
ReportSchema.plugin(autoIncrement.plugin, {
  model: 'reports',
  field: 'reportId',
  startAt: 1,
  incrementBy: 1
});

module.exports = Incidents = mongoose.model("reports", ReportSchema);