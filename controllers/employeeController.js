const { Employee } = require('../models');

async function setEmployee(req, res) {
    try {
        const employee = await Employee.create({ "firstName": req.body.firstName, "lastName": req.body.lastName });
        res.send(employee.toJSON());
    } catch (err) {
        res.status(400).send({
            error: `Error!`
        })
    }
}
/*
async function getEmployees(req, res) {
    try {
        console.log('this is a test');
        const employees = await Employee.findAll();
        res.send(employees);
    } catch (err) {
        res.status(400).send({
            error: `Eerror during getting employees ` + err
        });
    }
}

async function getEmployeeById(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(400).send({
            error: `Eerror during getting employee by id`
        });
    }
    res.send(employee);
}

async function updatEmployee(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(400).send({
            error: `Eerror during getting employee by id`
        });
    }
    await employee.save();
    res.send(employee);
}

async function deleteEmployee(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(400).send({
            error: `Eerror during getting employee by id`
        });
    }
    await employee.destroy();
    console.log("Employee -" + employee.firstName + "- deleted with success ");
    res.send(employee);
}
*/
module.exports = { setEmployee };