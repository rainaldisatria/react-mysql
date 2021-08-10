exports.fetchCartData = (req, res) => {
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