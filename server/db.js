const sequelize = require('sequelize')

const db = new sequelize("rumah_sakit", "root", "", {
    dialect: "mysql",
})

db.sync({}) 

db.authenticate().then(() => {
    console.log("connected to mysql")
})

module.exports = db;