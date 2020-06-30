// routes for reports module
var express = require('express');
var router = express.Router();
var incidentController = require('../controllers/reportController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/getReports', incidentController.getReports);
router.post('/createReport', incidentController.createReport);
router.post('/closeReport', incidentController.closeReport);
module.exports = router;