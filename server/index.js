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
    database: 'rumah_sakit',
});

expressApp.post('/delete', (req, res) => {  
    const columnName = req.body.columnName;
    const value = req.body.value;

    const query = `DELETE FROM ${'tabel_obat'} WHERE ${columnName} = '${value}'`;

    currentDB.query(query, (err, result) => {
        if(err){
            console.log(err);
        }
        else { 
            res.send(result);
            console.log('affected rows: ' + result.affectedRows); 
        }
    })  
})

expressApp.post('/insert', (req, res) => {
    const formData = req.body;    
    const columnName = [];
    const values = []; 

    // Setting up the const variable
    Object.keys(formData).map((value, key) => {
        values.push(formData[value]); 
        columnName.push(value);
    }) 

    const query = `INSERT INTO ${'tabel_obat'} (${columnName}) VALUES ?`;   

    currentDB.query(query, [[values]],(err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Number of record inserted " + result.affectedRows);
            res.send(result);
        }
    })   
})

expressApp.get('/getTable', (req, res) => { 
    const query = `SELECT * FROM ${'tabel_obat'}`;

    currentDB.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    }); 

    console.log('refreshed');
})    
 
expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

