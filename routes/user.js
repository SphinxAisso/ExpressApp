const express = require('express');
const router = express.Router();
const userController = require('../controllers/userConstroller');

router.get('/api/user',
    userController.getUsers);

router.route('/api/user/:id')
    .get(
        userController.getUserById)

    .put(
        userController.updatUser)

    .delete(
        userController.deleteUser)

module.exports = router;