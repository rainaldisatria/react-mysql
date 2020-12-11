const express = require('express');
const expressApp = express(); 
const mysql = require('mysql');

const currentDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database = 'w12',
}
)

expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

