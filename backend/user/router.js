const express=require('express');
const router=express.Router();

const { home, login, signup } = require('./Controller');
const { isValidLoginCredential } = require('./Validation');
router.get('/',home);

router.post('/login',isValidLoginCredential,login);

router.post('/signup',signup)

module.exports={router};