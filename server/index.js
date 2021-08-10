const express = require('express');
const expressApp = express();
const mysql = require('mysql');
const cors = require('cors');
const db = require('./db')

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

//#region Routes
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
  
//#region cart
expressApp.post('/removeCartItem', (req, res) => removeCartItem(req, res, currentDB))

expressApp.post('/setCartItemQuantity', (req, res) => setCartItemQuantity(req, res, currentDB))

expressApp.post('/addToCart', (req, res) => addToCart(req, res, currentDB))

expressApp.post('/fetchCart', (req, res) => fetchCart(req, res, currentDB))
//#endregion
 
//#region users  
const { signup, login, fetchAccount } = require('./controllers/usersController') 
const { getMonthlyIncome } = require('./controllers/tabelTransaksiController');
const { fetchJumlahPersediaan } = require('./controllers/tabelPersediaanController');
const { fetchCartData, selectTable, showTables, deleteTable, updateTableName, insertTable, table, descTable, buy, getAnalyticTable } = require('./controllers/adminController');
const { removeCartItem, setCartItemQuantity, addToCart, fetchCart } = require('./controllers/cartController');

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

expressApp.post('/getAnalyticTable', (req, res) =>  getAnalyticTable(req, res, currentDB))

expressApp.post('/buy', (req, res) => buy(req, res, currentDB))
//#endregion
//#endregion

expressApp.listen(3001, () => {
    console.log("Server is running on port 3001");
})

