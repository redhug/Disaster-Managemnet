const express = require("express");
const Resource = require("../model/resource");

const getResources = (req, res) => {
    Resource.find({ typeOfResource: req.query.typeOfResource })
      .then(incidents => res.json(incidents))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getResources = getResources

const getAvailableResources = (req, res) => {
    Resource.find({ status: 'Available' })
      .then(incidents => res.json(incidents))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getAvailableResources = getAvailableResources

const createResource = (req, res) => {
    Resource.findOne({ resourceName: req.body.resourceName }).then(resource => {
       
        if (resource) {
            return res.status(400).json({ email: "Resource already exists" });
        } else {
            const newResource = new Resource({                
                typeOfResource: req.body.typeOfResource,
                subtype: req.body.subtype,
                resourceName: req.body.resourceName,
                address: req.body.address,
                city: req.body.city,
                county: req.body.county,
                zip: req.body.zip,
                state: req.body.state,
                contactnumber: req.body.contactnumber,
                email: req.body.email                
            });
            newResource
                .save()
                .then(user => res.json(user))
                .catch(err => res.json(err));
        }
    });
};

module.exports.createResource = createResource