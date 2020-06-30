const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
// Create Incident Schema
const IncidentsSchema = new Schema({
  incidentId:{
    type: Number, 
    default: 0, 
    unique: true
  },
  incidentName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lat : {
    type: Number,
    default: 0
  },
  lng:{
    type: Number,
    default: 0
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required:true
  },
  humanResources:{
    type:[String],
    required:false
    
  },
  technicalResources:{
    type:[String],
    required:false
  },
  createdBy:{
    type:String,
    required:false
  }
  });
autoIncrement.initialize(mongoose.connection);
IncidentsSchema.plugin(autoIncrement.plugin, {
  model: 'incidents',
  field: 'incidentId',
  startAt: 1,
  incrementBy: 1
});

module.exports = Incidents = mongoose.model("incidents", IncidentsSchema);