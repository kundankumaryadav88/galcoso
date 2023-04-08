const express=require('express');
const router=express.Router();

const { home, login, signup } = require('./Controller');
router.get('/',home)

router.get('/login',login)

router.post('/signup',signup)

module.exports={router};