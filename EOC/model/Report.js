const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
// Create Report Schema
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
  title: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required:true
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
  lat : {
    type: Number,
    default: 0
  },
  lng:{
    type: Number,
    default: 0
  },
  levelOfImpact: {
    type: String
  },
  levelOfImpactStructuralDamage: {
    type: String
  },
  casualities:{
    red: { type: Number, default:0 },
    yellow: { type: Number,default:0  },
    green: { type: Number,default:0  },
    black: { type: Number,default:0  }     
},
  hazmatType: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdBy:{
    type: String
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