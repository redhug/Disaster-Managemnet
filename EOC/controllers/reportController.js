const express = require("express");
const router = express.Router();
// Load User model
const Reports = require("../model/Report");

const getReports = (req, res) => {
    console.log(req.query)
    Reports.find({ incidentId: req.query.incidentId })
      .then(reports => res.json(reports))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getReports = getReports


const createReport = (req, res) => {
    //console.log(req)
    Reports.findOne({ reportTitle: req.body.title }).then(report => {
        if (report) {
            return res.status(400).json({ email: "Report already exists" });
        } else {
            let casualities={
                                red: parseInt(req.body.red),
                                yellow: parseInt(req.body.yellow),
                                green:parseInt(req.body.green),
                                black: parseInt(req.body.black) 
                            }
            console.log(casualities)
            const newReport = new Reports({
                incidentId: req.body.incidentId,
                title: req.body.title,
                dateAndTime: req.body.timeDate,
                address: req.body.location,
                description: req.body.description,
                typeOfIncident: req.body.typeOfIncident,
                levelOfImpact: req.body.impactLevel,
                levelOfImpactStructuralDamage: req.body.structuralDamageImpact,
                casualities:casualities,
                hazmatType: req.body.hazmatType,
                notes: req.body.notes,
                createdBy: req.user.email
            });
            newReport.markModified('casualities');
            newReport
                .save()
                .then(report => res.json(report))
                .catch(err => console.log(err));
        }
    });
};

module.exports.createReport = createReport

const closeReport = (req, res) => {
    console.log(req.body.params)
    Reports.findOneAndUpdate({
        reportId:req.body.params.reportId
    }, 
    {
        $set:{
           status:'closed'
        }
    },
     (error, report)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(report){
        return res.json({code: 200, message:'Report closed.'})
    }else{
        return res.json({code: 404, message:'Something went wrong.'})
    }})
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.closeReport = closeReport

// const editReport = (req, res) => {
//     console.log('entered')
//     Report.findOneAndUpdate({
//         reportId:req.body.reportId
//     }, 
//     {
//         $set:{
//                 incidentId: req.body.incidentId,
//                 titleOfReport: req.body.titleOfReport,
//                 dateAndTime: req.body.dateAndTime,
//                 location: req.body.location,
//                 description: req.body.description,
//                 typeOfIncident: req.body.typeOfIncident,
//                 levelOfImpact: req.body.levelOfImpact,
//                 levelOfImpactStructuralDamage: req.body.levelOfImpactStructuralDamage,
//                 red: req.body.red,
//                 yellow: req.body.yellow,
//                 green: req.body.green,
//                 black: req.body.black,
//                 hazmatType: req.body.hazmatType,
//                 notes: req.body.notes 
//         }
//     },
//      (error, report)=>{
//     if(error){
//         return res.json({code: 400, message:'Something went wrong'})
//     }
//     if(report){
//         return res.json({code: 200, message:'Report edited.'})
//     }else{
//         return res.json({code: 404, message:'Something went wrong.'})
//     }})
//     .catch(err => res.status(400).json('Error: ' + err));
// };

// module.exports.editReport = editReport