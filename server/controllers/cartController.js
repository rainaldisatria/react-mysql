exports.removeCartItem = (req, res, currentDB) => {
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
}

exports.setCartItemQuantity = (req, res, currentDB) => {
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
}

exports.addToCart = (req, res, currentDB) => {
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
}

exports.fetchCart = (req, res, currentDB => {
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
}