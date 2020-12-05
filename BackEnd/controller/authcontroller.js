const bcrypt = require('bcrypt');
const {createToken}= require('./jwt/createtoken')
const {insertUser} = require("../database/user");
const {selectUser} = require("../database/user");
const connection = require('../database/db');

const compare = (password,hash)=>{
    return (new Promise((resolve,reject)=>{
            bcrypt.compare(password,hash,(err,result)=>{
                if(!err && result !== false)
                    resolve(result);
                else
                    reject(result);
            });
        })
    );
}   
module.exports.register = (req,res)=>{
    const  password  = req.body.password;
    bcrypt.hash(password,10)
    .then((hash)=>{
        return insertUser(req.body,hash);
    })
    .then((result)=>{
        return createToken(req.body.user_name);
    })
    .then((token)=>{
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:60*60*24,    
        })
        res.status(200).json({status:true});
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({ status:false , message : err.sqlMessage });
    });   
};

module.exports.login = (req,res)=>{
    let errorMessage;
    selectUser(req.body)
    .then((result)=>{
        return compare(req.body.password,result.results[0].hash);
    })
    .then(()=>{
        return createToken(req.body.userName);
    })
    .then((token)=>{
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:60*60*24
        })
        res.status(200).json({status:true})
    })
    .catch((err)=>{
        res.status(400).json({status:false,message:errorMessage});
    })
};

