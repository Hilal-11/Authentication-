const express = require('express');
const router = express.Router();

const createUser = require('../controllers/createUser')
const userLogin = require('../controllers/userLogin')

router.post("/createUser", createUser);
router.post('/login', userLogin);
module.exports = router