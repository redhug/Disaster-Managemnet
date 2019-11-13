var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.get('/pendingRequests', authController.pendingRequests)
router.post('/rejectUser', authController.rejectUser)
router.post('/acceptUser', authController.acceptUser)
module.exports = router;

