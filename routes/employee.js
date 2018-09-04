const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.post('/api/employee',
        employeeController.setEmployee);
/*
router.get('/api/employees',
        employeeController.getEmployees);

router.route('/api/employee/:id')
    .get(
        employeeController.getEmployeeById)

    .put(
        employeeController.updatEmployee)

    .delete(
        employeeController.deleteEmployee)
*/
module.exports = router;