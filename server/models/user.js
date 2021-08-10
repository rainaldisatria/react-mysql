const sequelize = require('sequelize')
const db = require('../db')

const user = db.define(
    "users",
    {
        firstName: {type: sequelize.STRING},
        lastName: {type: sequelize.STRING},
        username: {type: sequelize.STRING},
        password: {type: sequelize.STRING},
        userType: {type: sequelize.ENUM('user', 'admin')},
        balance: {type: sequelize.INTEGER},
    },
    {
        freezeTableName: true
    }
)

module.exports = user;