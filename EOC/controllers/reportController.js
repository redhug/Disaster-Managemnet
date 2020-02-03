const express = require("express");
const router = express.Router();
// Load User model
const Incidents = require("../model/Incidents");
const Reports = require("../model/Report");


const getReports = (req, res) => {
    Reports.find()
      .then(reports => res.json(reports))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getReports = getReports

const createReport = (req, res) => {
   
            const newReport = new Reports({
                // incidentId: Incidents.nextCount(function(err,count){
                //     return count;
                // }),
                incidentId: req.body.incidentName,
                address: req.body.address,
                dateAndTime: req.body.dateAndTime,
                description: req.body.description,
                status: "open"
            });
            newReport
                .save()
                .then(user => {
                    res.status(200);
                    return res.send("Created");
                    //res.json(user)
                }
                    )
                .catch(err => {
                    res.status(400);
                    console.log(err)});
    
};

module.exports.createReport = createReport
