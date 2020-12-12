const express = require('express');
const expressApp = express(); 
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');

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
    console.log(req.body);

    var query = "INSERT INTO " + "anggota" + " VALUES ?";
    var values = [
        ["ANG-016", "Almira", "Jaksel", "Jakarta", "1990-09-21 00:00:00", "Perempuan", "Pengusaha", "0895617740232"],
    ]; 

    currentDB.query(query, [values], (err, result) => {
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

