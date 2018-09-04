const Entreprise = (sequelize) =>
    sequelize.define('Entreprise', {
        name: {
            type: String,
            unique: true
        },
        adresse: String
    });

module.exports = Entreprise