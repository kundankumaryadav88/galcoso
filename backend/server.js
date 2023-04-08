const express=require('express');
const data=require('../config/config.json');
const app=express();

const { router } = require('./user/router');
app.use(express.json());
app.use(router);



app.listen(data['port'],(error)=>{
    if(error){
        console.log(error);
        return
    }

    console.log(`http://localhost:${data['port']}`);
})

