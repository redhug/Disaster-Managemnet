var express = require('express');
var router = express.Router();
var incidentController = require('../controllers/reportController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/getReports', incidentController.getReports);
router.post('/createReport', incidentController.createReport);
router.post('/closeReport', incidentController.closeReport);
router.post('/editReport', incidentController.editReport);
module.exports = router;