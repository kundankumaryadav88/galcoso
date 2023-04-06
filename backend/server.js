const express=require('express');
const data=require('../config/config.json');
const app=express();
// app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200)
    .send(JSON.stringify('its me your server'))
    .end()
})

app.listen(data['port'],(error)=>{
    if(error){
        console.log(error);
        return
    }

    console.log(`http://localhost:${data['port']}`);
})