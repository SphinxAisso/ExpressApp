const User = (sequelize) =>
    sequelize.define('User', {
        email: {
            type: String,
            unique: true
        },
        password: String
    });

module.exports = User