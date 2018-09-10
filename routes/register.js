const express = require('express');
const router = express.Router();
const userController = require('../controllers/userConstroller');
const authenticationController = require('../controllers/authenticationController');
const authenticationControllerPolicy = require('../policies/authenticationControllerPolicy');

router.post('/api/register',
    authenticationControllerPolicy.register,
    authenticationController.register);

router.post('/api/login',
    authenticationController.signIn);

module.exports = router;
