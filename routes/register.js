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

router.get('/api/users',
    userController.getUsers);

router.route('/api/user/:id')
    .get(
    userController.getUserById)

    .put(
    userController.updatUser)

    .delete(
    userController.deleteUser)

module.exports = router;
