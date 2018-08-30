const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/AuthenticationController');
const authenticationControllerPolicy = require('../policies/authenticationControllerPolicy')

router.post('/api/register',
    authenticationControllerPolicy.register,
    AuthenticationController.register);

module.exports = router;