var express = require('express');
var router = express.Router();
var reportController = require('../controllers/reportController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/getReports/', reportController.getReports);

module.exports = router;

