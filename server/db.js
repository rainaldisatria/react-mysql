const sequelize = require('sequelize')

const db = new sequelize("rumah_sakit", "root", "", {
    dialect: "mysql",
})

db.sync({})

module.exports = db;