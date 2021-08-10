exports.getMonthlyIncome = (req, res, currentDB) => {
    const monthID = Object.keys(req.body)[0];
    const curYear = new Date().getFullYear();
    const query = `Select SUM(Jumlah_Obat) as income from tabel_transaksi where month(Tgl_Transaksi) = ${monthID} and year(Tgl_Transaksi) = ${curYear}`;

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