const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();
// const { authentificationMiddleware } = require('./index')

function authentificationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

router.post('/api/employee',
        authentificationMiddleware(),
        employeeController.setEmployee);

router.get('/api/employee/:entrepriseId',
        authentificationMiddleware(),
        employeeController.getEmployees);

router.route('/api/employee/:id/:entrepriseId')
    .get(
        authentificationMiddleware(),
        employeeController.getEmployeeById)

    .put(
        authentificationMiddleware(),
        employeeController.updatEmployee)

    .delete(
        authentificationMiddleware(),
        employeeController.deleteEmployee)

module.exports = router;