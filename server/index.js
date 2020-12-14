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
    const query = 'DELETE FROM tabel_obat WHERE ';
    const columnName = req.body.columnName;
    const value = req.body.value;
    const finalQuery = query.concat(columnName, " = ?"); 

    currentDB.query(finalQuery, [value], (err, result) => {
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
    const values = []; 

    Object.keys(formData).map((value, key) => {
        values.push(formData[value]);
    }) 

    const query = "INSERT INTO " + "tabel_obat" + " VALUES ?"; 

    currentDB.query(query, [[values]], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Number of record inserted " + result.affectedRows);
            res.send(result);
        }
    })   
})

expressApp.get('/anggota', (req, res) => { 
    currentDB.query("SELECT * FROM tabel_obat", (err, result) => {
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

