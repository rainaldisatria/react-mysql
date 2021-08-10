const sequelize = require('sequelize')
const db = require('../db')

const user = db.define(
    "users",
    {
        username: { type: sequelize.STRING, primaryKey: true },
        firstName: { type: sequelize.STRING },
        lastName: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        userType: { type: sequelize.ENUM('user', 'admin') },
        balance: { type: sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = user;