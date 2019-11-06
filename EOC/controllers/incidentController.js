const express = require("express");
const router = express.Router();
// Load User model
const Incidents = require("../model/Incidents");

const getIncidents = (req, res) => {
    Incidents.find({ status: req.query.status })
      .then(incidents => res.json(incidents))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getIncidents = getIncidents

const createIncident = (req, res) => {
    Incidents.findOne({ incidentName: req.body.incidentName }).then(incident => {
        if (incident) {
            return res.status(400).json({ email: "Incident already exists" });
        } else {
            const newIncident = new Incidents({
                // incidentId: Incidents.nextCount(function(err,count){
                //     return count;
                // }),
                incidentName: req.body.incidentName,
                address: req.body.address,
                dateAndTime: req.body.dateAndTime,
                description: req.body.description,
                status: "open"
            });
            newIncident
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
};

module.exports.createIncident = createIncident

const closeIncident = (req, res) => {
    console.log(req.body.params)
    Incidents.findOneAndUpdate({
        incidentId:req.body.params.incidentId
    }, 
    {
        $set:{
           status:'closed'
        }
    },
     (error, incident)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(incident){
        return res.json({code: 200, message:'Incident closed.'})
    }else{
        return res.json({code: 404, message:'Something went wrong.'})
    }})
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.closeIncident = closeIncident

const editIncident = (req, res) => {
    console.log('entered')
    Incidents.findOneAndUpdate({
        incidentId:req.body.incidentId
    }, 
    {
        $set:{
            incidentName: req.body.incidentName,
            address: req.body.address,
            dateAndTime: req.body.dateAndTime,
            description: req.body.description,  
        }
    },
     (error, incident)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(incident){
        return res.json({code: 200, message:'Incident edited.'})
    }else{
        return res.json({code: 404, message:'Something went wrong.'})
    }})
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.editIncident = editIncident