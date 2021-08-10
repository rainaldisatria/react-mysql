const sequelize = require('sequelize')
const db = require('../db')

const user = db.define(
    "user",
    {
        firstName: {type: sequelize.STRING},
        lastName: {type: sequelize.STRING},
        username: {type: sequelize.STRING},
        password: {type: sequelize.STRING},
        userType: {type: sequelize.ENUM},
        balance: {type: sequelize.INTEGER},
    }
)