var express = require('express');
var router = express.Router();
var resourceController = require('../controllers/resourcesController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/createResource', resourceController.createResource);

module.exports = router;

