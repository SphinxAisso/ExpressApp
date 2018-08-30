module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {
        email: {
            type: String,
            unique: true
        },
        password: String
    });
