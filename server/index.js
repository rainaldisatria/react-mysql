const express = require('express');
const expressApp = express();
const mysql = require('mysql');
const cors = require('cors');
const db = require('./db')

db.authenticate().then(() => {
    console.log("connected to mysql")
})

expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(cors());

const currentDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'rumah_sakit',
    multipleStatements: true,
});

//#region tabel_transaksi
expressApp.post('/getMonthlyIncome', (req, res) => getMonthlyIncome(req, res, currentDB))
//#endregion

//#region tabel_persediaan
expressApp.post('/fetchJumlahPersediaan', (req, res) => fetchJumlahPersediaan(req, res, currentDB))
//#endregion
 
//#region tabel_obat   
const { fetchObatData, fetchObat } = require('./controllers/tabelObatController');

expressApp.post('/fetchObatData', (req, res) => fetchObatData(req, res, currentDB))

expressApp.post('/fetchObat', (req, res) => fetchObat(req, res, currentDB))
//#endregion
 
expressApp.post('/getAnalyticTable', (req, res) => {
    const fromDate = req.body.fromDate;
    const untilDate = req.body.untilDate;

    // (100-SUM(jumlah_obat)) as sisa_stok
    const query = `SELECT tabel_obat.kode_obat, nama_obat, harga_satuan, SUM(jumlah_obat) AS jumlah_terjual,
    harga_satuan * SUM(jumlah_obat) AS Total_Harga_Terjual
    FROM tabel_obat JOIN tabel_transaksi ON
    tabel_obat.kode_obat = tabel_transaksi.kode_obat JOIN tabel_persediaan ON 
    tabel_persediaan.kode_obat = tabel_obat.kode_obat 
    WHERE (tabel_transaksi.Tgl_Transaksi BETWEEN '${fromDate}' AND '${untilDate}') 
    group by kode_obat;`
    const totalPendapatan = `
    SELECT SUM(IQuery.Harga_Total_PerBarang) as TotalPendapatan 
    FROM 
        (SELECT SUM(Jumlah_Obat * Harga_Satuan) AS Harga_Total_PerBarang FROM tabel_transaksi JOIN tabel_obat ON 
        tabel_transaksi.Kode_Obat = tabel_obat.Kode_Obat 
        WHERE tabel_transaksi.Tgl_Transaksi BETWEEN '${fromDate}' AND '${untilDate}'
        GROUP BY tabel_transaksi.Kode_Obat) as IQuery;`

    currentDB.query(query + totalPendapatan, (error, result) => {
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

expressApp.post('/buy', (req, res) => {
    const username = req.body.username;
    const data = req.body.data;

    const insertIntoOrdersQuery = `INSERT INTO orders (date, username, kodeObat, namaObat, hargaSatuan, bentukObat, quantity)
    VALUES (CURDATE(), '${username}', '${data.Kode_Obat}', '${data.Nama_Obat}', '${data.Harga_Satuan}', '${data.Bentuk_Obat}', '${data.quantity}');`;

    const insertToTableTransaksi = `INSERT INTO tabel_transaksi (Kode_Obat, Tgl_Transaksi, Jumlah_Obat) 
    VALUES ('${data.Kode_Obat}', CURDATE(), '${data.quantity}') ON DUPLICATE KEY UPDATE
    Jumlah_Obat = Jumlah_Obat + ${data.quantity};`;

    const clearCartQuery = `DELETE FROM cart WHERE username = '${username}'`;

    currentDB.query(insertIntoOrdersQuery + insertToTableTransaksi + clearCartQuery, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(response);
            res.send(response);
        }
    })
})

//#region cart
expressApp.post('/removeCartItem', (req, res) => {
    const username = req.body.username;
    const kodeObat = req.body.kodeObat;

    const query = `DELETE FROM cart WHERE username = '${username}' and kodeObat = '${kodeObat}'`;

    currentDB.query(query, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
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
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
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
//#endregion
 
//#region users  
const { signup, login, fetchAccount } = require('./controllers/usersController')
const User = require('./models/user');
const { getMonthlyIncome } = require('./controllers/tabelTransaksiController');
const { fetchJumlahPersediaan } = require('./controllers/tabelPersediaanController');
const { fetchCartData, selectTable, showTables, deleteTable, updateTableName, insertTable, table, descTable } = require('./controllers/adminController');

expressApp.post('/fetchAccount', (req, res) => fetchAccount(req, res, currentDB))

expressApp.post('/signup', signup)

expressApp.post('/login', login)
//#endregion

//#region Database management 
expressApp.post('/fetchCartData', (req, res) => fetchCartData(req, res, currentDB))

expressApp.post('/selectTable', selectTable)

expressApp.get('/', (req, res) => showTables(req, res, currentDB))

expressApp.post('/delete/:tableName', (req, res) => deleteTable(req, res, currentDB))

expressApp.post(`/update/:tableName`, (req, res) => updateTableName(req, res, currentDB))

expressApp.post('/insert/:tableName', (req, res) => insertTable(req, res, currentDB))

expressApp.get('/table/:tableName', (req, res) => table(req, res, currentDB))

expressApp.get('/desc/:tableName', (req, res) => descTable(req, res, currentDB))
//#endregion

expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

