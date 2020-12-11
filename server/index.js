const express = require('express');
const expressApp = express(); 
const mysql = require('mysql');
const cors = require('cors');

expressApp.use(cors());

const currentDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'w12',
});

expressApp.get('/employees', (req, res) => { 
    currentDB.query("SELECT * FROM anggota", (err, result) => {
        if(err) {
            console.log("error");
        }
        else{
            res.send(result);
        }
    }); 
})
 
expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

