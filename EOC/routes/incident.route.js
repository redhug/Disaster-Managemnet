// routes for indicent module
var express = require('express');
var router = express.Router();
var incidentController = require('../controllers/incidentController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/getIncidents', incidentController.getIncidents);
router.post('/createIncident', incidentController.createIncident);
router.post('/closeIncident', incidentController.closeIncident);
router.post('/editIncident', incidentController.editIncident);
router.get('/userdata', incidentController.userdata);
router.post('/assignResourceToIncident', incidentController.assignResourceToIncident);
module.exports = router;

