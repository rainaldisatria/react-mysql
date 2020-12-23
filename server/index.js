const express = require('express');
const expressApp = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(cors());

const currentDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'rumah_sakit',
}); 

expressApp.post('/removeCartItem', (req, res) => {
    const username = req.body.username;
    const kodeObat = req.body.kodeObat;

    const query = `DELETE FROM cart WHERE username = '${username}' and kodeObat = '${kodeObat}'`;

    currentDB.query(query, (error, response) => {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            console.log(response);
            res.send(response);
        }
    })
})

expressApp.post('/setCartItemQuantity', (req, res) => {
    const username = req.body.username;
    const kodeObat = req.body.kodeObat;
    const quantity = req.body.quantity;

    const query = `INSERT INTO cart (username, kodeObat, quantity) VALUES ('${username}', "${kodeObat}", ${quantity}) ON DUPLICATE KEY UPDATE quantity=${quantity}`;

    console.log(query);

    currentDB.query(query, (error, result) => {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})

expressApp.post('/addToCart', (req, res) => {
    const username = req.body.username;
    const kodeObat = req.body.kodeObat;
    const quantity = req.body.quantity;

    const query = `INSERT INTO cart 
    (username, kodeObat, quantity) VALUES
    ('${username}', "${kodeObat}", ${quantity}) ON DUPLICATE KEY 
    UPDATE quantity=quantity + ${quantity}`;

    console.log(query);

    currentDB.query(query, (error, result) => {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})

expressApp.get('/fetchObat', (req, res) => {
    const query = `SELECT * FROM tabel_obat`;

    currentDB.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

expressApp.post('/fetchCart', (req, res) => {
    const username = Object.keys(req.body)[0];
    console.log(req.body);

    const query = `SELECT * FROM cart WHERE username='${username}'`;
    console.log(query);

    currentDB.query(query, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
})

expressApp.post('/fetchAccount', (req, res) => {
    const username = Object.keys(req.body)[0];
    const query = `SELECT * FROM users WHERE username='${username}'`;

    currentDB.query(query, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
})

//#region 
expressApp.post('/signup', (req, res) => {
    const data = req.body;
    var columnsName = [];
    var values = [];
    Object.keys(data).map((columnName, colId) => {
        columnsName.push(columnName);
        values.push(data[columnName]);
    })


    const query = `INSERT INTO users (${columnsName}, userType) VALUES 
        (${values.map(val => `'${val}'`).join(", ")}, 'user')`;
    console.log(query);

    currentDB.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

expressApp.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM users WHERE username='${username}' and password='${password}'`;
    console.log(query)
    currentDB.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})
//#endregion

//#region Database management
expressApp.post('/selectTable', (req, res) => {
    selected_table = Object.keys(req.body)[0];
    res.send(selected_table);
})

expressApp.get('/', (req, res) => {
    const query = `SHOW TABLES`;

    currentDB.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

expressApp.post('/delete/:tableName', (req, res) => {
    tableName = req.params.tableName;
    const columnName = req.body.columnName;
    const value = req.body.value;

    const query = `DELETE FROM ${tableName} WHERE ${columnName} = "${value}"`;

    currentDB.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result);
            console.log('affected rows: ' + result.affectedRows);
        }
    })
})

expressApp.post(`/update/:tableName`, (req, res) => {
    const tableName = req.params.tableName;

    const updatedData = req.body.editedObject;
    let updateQuery = [];
    Object.keys(updatedData).map((columnName, colId) => {
        updateQuery.push(`${columnName} = '${updatedData[columnName]}'`)
    })

    const whereData = req.body.whereTo;
    let whereQuery = [];
    Object.keys(whereData).map((columnName, colId) => {
        whereQuery.push(`${columnName} = '${whereData[columnName]}`)
    })
    let newWhereQuery = `${Object.keys(whereData)[0]} = '${whereData[Object.keys(whereData)[0]]}'`

    const query = `UPDATE ${tableName} SET ${updateQuery} WHERE ${newWhereQuery}`

    currentDB.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            res.send(result)
            console.log(result);
        }
    })
})

expressApp.post('/insert/:tableName', (req, res) => {
    const tableName = req.params.tableName;
    const formData = req.body;
    const columnName = [];
    const values = [];

    // Setting up the const variable
    Object.keys(formData).map((value, key) => {
        values.push(formData[value]);
        columnName.push(value);
    })

    const query = `INSERT INTO ${tableName} (${columnName}) VALUES ?`;

    currentDB.query(query, [[values]], (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            console.log("Number of record inserted " + result.affectedRows);
            res.send(result);
        }
    })
})

expressApp.get('/table/:tableName', (req, res) => {
    const tableName = req.params.tableName;
    const query = `SELECT * FROM ${tableName}`;

    currentDB.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

expressApp.get('/desc/:tableName', (req, res) => {
    const tableName = req.params.tableName;
    const query = `DESC ${tableName}`;

    currentDB.query(query, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
//#endregion

expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

