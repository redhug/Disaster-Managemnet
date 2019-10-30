// const express = require("express");
// const router = express.Router();
// // Load User model
// const Incidents = require("../model/Incidents");


// var counter = function (name) {
//     var ret = db.counters.findAndModify({ query: { _id: name }, update: { $inc: { next: 1 } }, "new": true, upsert: true });
//     // ret == { “_id” : “users”, “next” : 1 }
//     return ret.next;
// };



// const createIncident = (req, res) => {
//     Incidents.findOne({ incidentName: req.body.incidentName }).then(incident => {
//         if (incident) {
//             return res.status(400).json({ email: "Incident already exists" });
//         } else {
//             Incidents.insert({_id:counter(Incidents), incidentName:req.body.incidentName,
//                 address:req.body.address,dateAndTime:req.body.dateAndTime,description:req.body.description }) 
//             // const newIncident = new Incidents({
//             //     firstName: req.body.firstName,
//             //     lastName: req.body.lastName,
//             //     email: req.body.email,
//             //     password: req.body.password,
//             //     contactNo: req.body.contactNo,
//             //     medicalCertification: req.body.medicalCertification,
//             //     enforcementOfficer: req.body.enforcementOfficer
//             // });

//             // newIncident
//             //     .save()
//             //     .then(user => res.json(user))
//             //     .catch(err => console.log(err));
//         }
//     });
// };

// module.exports.createIncident = createIncident