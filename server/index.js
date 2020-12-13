const express = require('express');
const expressApp = express(); 
const mysql = require('mysql');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { request } = require('express');

expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(express.json());
expressApp.use(cors()); 

const currentDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'w12',
});

expressApp.get('/anggota', (req, res) => { 
    currentDB.query("SELECT * FROM anggota", (err, result) => {
        if(err) {
            console.log("error");
        }
        else{
            res.send(result);
        }
    }); 
})    

expressApp.post('/delete', (req, res) => { 
    var query = 'DELETE FROM anggota WHERE ';
    var columnName = req.body.columnName;
    var value = req.body.value;
    var finalQuery = query.concat(columnName, " = ?");

    console.log(query);

    currentDB.query(finalQuery, [value], (err, result) => {
        if(err){
            console.log(err);
        }
        else { 
            console.log('affected rows: ' + result.affectedRows); 
        }
    })  
})

expressApp.post('/insert', (req, res) => {
    var formData = req.body;   
    var values = []; 

    Object.keys(formData).map((value, key) => {
        values.push(formData[value]);
    }) 

    var query = "INSERT INTO " + "anggota" + " VALUES ?";
    console.log(values + "test");

    currentDB.query(query, [[values]], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Number of record inserted " + result.affectedRows);
        }
    })  

    return res.json();
})
 
expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

