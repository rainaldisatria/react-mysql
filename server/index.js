const express = require('express');
const expressApp = express(); 
const mysql = require('mysql');
const cors = require('cors'); 
const bodyParser = require('body-parser');

expressApp.use(bodyParser.urlencoded({extended: true}));
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

expressApp.get('/insert', (req, res) => {
    res.send("<h1>Hello world </h1>");
})

expressApp.post('/insert', (req, res) => {
    var formData = req.body; 
    var values = []; 

    Object.keys(formData).map((value, key) => {
        values.push(formData[value]);
    }) 

    var query = "INSERT INTO " + "anggota" + " VALUES ?";

    currentDB.query(query, [[values]], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Numbe of record inserted " + result.affectedRows);
        }
    })

    res.send("Done");
})
 
expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

