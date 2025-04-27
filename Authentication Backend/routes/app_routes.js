const express = require('express');
const router = express.Router();

const createUser = require('../controllers/createUser')
const userLogin = require('../controllers/userLogin')
const SignUpSchema = require('../Validator/auth_validation')
const validate = require('../middlewares/validate_middleware')

router.post("/createUser", validate(SignUpSchema) ,createUser);
router.post('/login', userLogin);
module.exports = router