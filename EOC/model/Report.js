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
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  typeOfIncident: {
    type: String,
  },
  levelOfImpact: {
    type: String,
  },
  levelOfImpactStructuralDamage: {
    type: String
  },
  Casualities:{
    Red: { type: Number },
    Yellow: { type: Number },
    Green: { type: Number },
    Black: { type: Number }     
},
  hazmatType: {
    type: String,
  },
  notes: {
    type: String,
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