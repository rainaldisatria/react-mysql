exports.fetchObatData = (req, res, currentDB) => {
    const kodeObat = Object.keys(req.body)[0];

    const query = `SELECT * FROM tabel_obat WHERE Kode_Obat = '${kodeObat}'`;
    currentDB.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result)
        }
    })
} 