const express = require('express');
const { signup, login, fetchAccount } = require('../controllers/usersController') 

const router = express.Router() 

router.post('/fetchAccount', (req, res) => fetchAccount(req, res, currentDB))

router.post('/signup', signup)

router.post('/login', login)

module.exports = router