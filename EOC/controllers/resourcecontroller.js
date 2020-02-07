const express = require("express");
const Resource = require("../model/resource");
const createResource = (req, res) => {
    Resource.findOne({ ResourceName: req.body.ResourceName }).then(Resource => {
        if (Resource) {
            return res.status(400).json({ email: "Resource already exists" });
        } else {
            const newResource = new Resource({                
                TypeofResource: req.body.TypeofResource,
                Resourcesubtype: req.body.Resourcesubtype,
                resourceName: req.body.resourceName,
                location: req.body.location,
                address: req.body.address,
                address2: req.body.address2,
                city: req.body.city,
                county: req.body.county,
                zipcode: req.body.zipcode,
                state: req.body.state,
                resourceMobileNumber: req.body.resourceMobileNumber,
                resourceEmail: req.body.resourceEmail                
            });
            newResource
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
};

module.exports.createResource = createResource