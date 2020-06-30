// routes for resource module
var express = require('express');
var router = express.Router();
var resourceController = require('../controllers/resourcesController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/createResource/', resourceController.createResource)
router.get('/getResources/' , resourceController.getResources)
router.get('/getAvailableResources/' , resourceController.getAvailableResources)
module.exports = router;

