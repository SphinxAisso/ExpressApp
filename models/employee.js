const Employee = (sequelize) =>
    sequelize.define('Employee', {
        firstName: String,
        lastName: String,
        EntrepriseId: String
    });

module.exports = Employee