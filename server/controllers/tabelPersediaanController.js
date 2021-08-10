exports.fetchJumlahPersediaan = (req, res, currentDB) => {
    const kodeObat = req.body.kodeObat;

    const query = `SELECT Jumlah_Sedia FROM tabel_persediaan WHERE Kode_Obat = '${kodeObat}'`;
    console.log(query);
    currentDB.query(query, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
}