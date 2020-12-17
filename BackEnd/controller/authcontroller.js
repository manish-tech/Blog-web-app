const bcrypt = require('bcrypt');
const {createToken}= require('./jwt/createtoken')
const {insertUser} = require("../database/user");
const {selectUser} = require("../database/user");
const verifyToken = require("./jwt/verifytoken");
const connection = require('../database/db');

module.exports.register = (req,res)=>{
    const  password  = req.body.password;
    bcrypt.hash(password,10)
    .then((hash)=>{
        return insertUser(req.body,hash);
    })
    .then((result)=>{
        return createToken(req.body.userName);
    })
    .then((token)=>{
        try{
            res.cookie('token',token,{
                httpOnly:true,
                maxAge:1000*60*60*24 
            })
            res.status(200).json({status:true});
        }
        catch(error){
            res.res.status(400).json({ status:false , message : "please try again" });
        }
    })
    .catch((errorMessage)=>{
        res.status(400).json({ status:false , message : errorMessage });
    });   
};

module.exports.login = (req,res)=>{
    selectUser(req.body)
    .then((result)=>{
        return bcrypt.compare(req.body.password,result.results[0].hash);
    })
    .then((result)=>{
        if(result)
            return createToken(req.body.userName);
        else
            throw new Error("password: incorrect password");
    })
    .then((token)=>{
        try{
            res.cookie("token",token,{
                httpOnly:true,
                maxAge:1000*60*60*24
            })
            res.status(200).json({status:true});
        }
        catch(e){
            res.status(400).json({status:false,message:"please try again"});
        }
    })
    .catch((errorMessage)=>{
        console.log( {errorMessage});
        res.status(400).json({status:false,message:errorMessage.message || errorMessage});
    })
};

module.exports.isAuthenticated = (req,res)=>{
    const cookies = req.cookies;
    if(cookies.token){
        verifyToken(cookies.token)
        .then((decoded)=>{
            res.status(200).json({status : true});
        })
        .catch((err)=>{
            res.status(400).json({status : false});
        })
    }
    else{
        res.status(400).json({status : false});
    }
}