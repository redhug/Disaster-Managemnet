var express = require('express');
var router = express.Router();
var resourceController = require('../controllers/resourceController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/createIncident/', resourceController.createResource);

module.exports = router;

