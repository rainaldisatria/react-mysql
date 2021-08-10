const sequelize = require('sequelize')
const db = require('../db')

const User = db.define(
    "users",
    {
        firstName: {type: sequelize.STRING},
        lastName: {type: sequelize.STRING},
        username: {type: sequelize.STRING, primaryKey: true},
        password: {type: sequelize.STRING},
        userType: {type: sequelize.ENUM('user', 'admin')},
        balance: {type: sequelize.INTEGER},
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = User;