const Employee = (sequelize) =>
    sequelize.define('Employee', {
        firstName: String,
        lastName: String,
    });

module.exports = Employee