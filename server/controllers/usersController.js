
const User = require('../models/user')

exports.signup = async (req, res) => { 
    try {
        const { firstName, lastName, username, password, userType, balance } = req.body; 

        await User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userType: userType,
            balance: balance,
        });


        res.json(req.body)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
}

exports.login = async (req, res) => { 
    try{
        const {username, password} = req.body;

        const result = await User.findAll({

            where:{
                username: username,
                password: password,
            }
        })

        res.json(result)
    }
    catch{

    }
}

exports.fetchAccount = (req, res, currentDB) => {
    const username = Object.keys(req.body)[0];
    const query = `SELECT * FROM users WHERE username='${username}'`;

    currentDB.query(query, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
}