const express=require('express');
const data=require('../config/config.json');
const app=express();
const{queryWithPara}=require('./utilities/db');
const hash=require('password-hash');
// app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200)
    .send(JSON.stringify('its me your server'))
    .end()
})

app.get('/login',(req,res)=>{
    res.status(200)
    .send(JSON.stringify('its me your server'))
    .end()
})

app.get('/signup',async(req,res)=>{
    const email="raman@gmail.com";
    const password="Raman@321";
    const mobile="750324730";

    const hashPassword=hash.generate(password);

    const result=await queryWithPara(`insert into login(email,password,mobile)values($1,$2,$3)`,[email,hashPassword,mobile]);
    console.warn(result)
     if(result.rowCount==1){
    res.status(200)
    .send(JSON.stringify({data:[],success:true,message:'you signed successfully'}))
    .end();
     }else{
        res.status(400)
        .send(JSON.stringify({data:[],success:false,message:'sorry! try again later'}))
        .end()
     }
})

app.listen(data['port'],(error)=>{
    if(error){
        console.log(error);
        return
    }

    console.log(`http://localhost:${data['port']}`);
})

