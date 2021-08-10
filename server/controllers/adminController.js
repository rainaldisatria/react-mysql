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

exports.buy = (req, res, currentDB) => {
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
}

exports.getAnalyticTable = (req, res, currentDB) => {
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
}