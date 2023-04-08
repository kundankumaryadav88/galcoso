
const{queryWithPara,query}=require('../utilities/db');
const hash=require('password-hash');
const home= (req,res)=>{
    res.status(200)
    .send(JSON.stringify('its me your server'))
    .end()
}

const login=(req,res)=>{
    res.status(200)
    .send(JSON.stringify('its me your server'))
    .end()
}

const signup=async(req,res)=>{
    const {email,password,mobile}=req.body;
    const isUserExist=await query(`select email from login where email='${email}' `);
    console.log(isUserExist.rowCount);
    if(isUserExist.rowCount==0){
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
    }
    else{
        res.status(400)
        .send(JSON.stringify({data:[],success:false,message:'User already exist'}))
        .end()
    }
}

module.exports={home,login,signup}