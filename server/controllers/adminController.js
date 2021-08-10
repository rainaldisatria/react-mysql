exports.fetchCartData = (req, res, currentDB) => {
    const username = Object.keys(req.body)[0];
    const getTotalPriceQuery = `SELECT SUM(cart.quantity * tabel_obat.Harga_Satuan) AS totalHarga FROM cart LEFT JOIN tabel_obat ON kodeObat = Kode_Obat WHERE cart.username = '${username}';`;
    const getItemCountQuery = `SELECT SUM(quantity) as totalItem FROM cart WHERE username = '${username}';`;

    currentDB.query(getTotalPriceQuery + getItemCountQuery, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
}

exports.selectTable = (req, res) => {
    selected_table = Object.keys(req.body)[0];
    res.send(selected_table);
}

exports.showTables = (req, ers, currentDB) => {
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
}

exports.deleteTable = (req, res, currentDB) => {
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
}