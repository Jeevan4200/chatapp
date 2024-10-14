const express = require('express');
const router = express.Router();
const {register} = require('../userController/userController.js');
const {login} = require('../userController/userController.js')
router.post('/register',register);
router.post('/login',login);

module.exports =router;