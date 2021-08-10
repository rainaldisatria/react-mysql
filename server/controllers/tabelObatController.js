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

exports.fetchObat = (req, res, currentDB) => {
    const keyword = req.body.keyword;

    const query = `SELECT * FROM tabel_obat WHERE
    (
        nama_obat LIKE '%${keyword}%' 
    ) `;

    currentDB.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
}