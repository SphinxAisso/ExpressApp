const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs
    .readdirSync(__dirname)
    .filter((file) => 
        file !== 'index.js'
    )
    .sort((b, a) => a.localeCompare(b))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        console.log("File currently loading : " + file + " for model " + model.name);
        db[model.name] = model
    })

const { User, Entreprise, Employee } = db;

console.log('User ' + User)
console.log('Entreprise ' + Entreprise)

User.hasMany(Entreprise);
Entreprise.belongsTo(User);
Entreprise.hasMany(Employee);
Employee.belongsTo(Entreprise);

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
