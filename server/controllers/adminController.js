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

exports.updateTableName = (req, res, currentDB) => {
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
}

exports.insertTable = (req, res, currentDB) => {
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
}

exports.table = (req, res, currentDB) => {
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
}

exports.descTable = (req, res, currentDB) => {
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
}