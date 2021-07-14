const bcrypt = require('bcrypt');
const {createToken}= require('./jwt/createtoken')
const {insertUser} = require("../database/user");
const {selectUser} = require("../database/user");
const verifyToken = require("./jwt/verifytoken");
const { uploadImageToCloudinary }= require('../utils/cloudinary');

module.exports.uploadProfilePic = async (req,res)=>{
    try{
        const { src } = await uploadImageToCloudinary(req,'create-blog-app-post-images');
        res.status(201).json({ src : src });
    }
    catch(error){
        console.log(error,'handleUploadImagePost');
        res.status(500).json({message : 'something went wrong !'});
    }
}


module.exports.register = (req,res)=>{
    let url = '';
    const  password  = req.body.password;
    bcrypt.hash(password,10)
    .then((hash)=>{
        url = req.body.url;
        return insertUser(req.body,hash);
    })
    .then((result)=>{
        
        return createToken(req.body.userName);
    })
    .then((data)=>{
        try{
            res.cookie('token',data.token,{
                httpOnly:true,
                maxAge:1000*60*60*24 
            })
            res.status(200).json({status:true , data : {
                userName : data.userName,
                url : url
            }});
        }
        catch(error){
            res.res.status(400).json({ status:false , message : "please try again" });
        }
    })
    .catch((errorMessage)=>{
        console.log(errorMessage);
        res.status(400).json({ status:false , message : errorMessage });
    });   
};

module.exports.login = (req,res)=>{
    let url = '';
    selectUser(req.body)
    .then((result)=>{
        url = result.results[0].profile_pic_url;
        return bcrypt.compare(req.body.password,result.results[0].hash);
    })
    .then((result)=>{
      
        if(result)
            return createToken(req.body.userName);
        else
            throw new Error("password: incorrect password");
    })
    .then((data)=>{
        try{
            res.cookie("token",data.token,{
                httpOnly:true,
                maxAge:1000*60*60*24
               
            })
            
            res.status(200).json({status:true , data:{
                userName : data.userName,
                url : url
            }});
        }
        catch(e){
            res.status(400).json({status:false,message:"please try again"});
        }
    })
    .catch((errorMessage)=>{
        console.log(errorMessage);
        res.status(400).json({status:false,message:errorMessage.message || errorMessage});
    })
};

module.exports.isAuthenticated = (req,res)=>{
    const cookies = req.cookies;
    let tokenDecoded = {};
    if(cookies.token){
        verifyToken(cookies.token)
        .then((decoded)=>{
    
            tokenDecoded = {
                ...decoded
            }
            return selectUser(decoded);
        })
        .then((decoded)=>{
            let url = decoded.results[0].profile_pic_url;
            tokenDecoded = {
                ...tokenDecoded,
                url : url
            }
            res.status(200).json({status : true ,data : tokenDecoded});
        })
        .catch((err)=>{
            res.status(400).json({status : false});
        })
    }
    else{
        res.status(400).json({status : false});
    }
}

module.exports.logout = (req,res)=>{
    try{
        res.cookie("token","",{
            httpOnly:true,
            maxAge:1  
        })

        res.status(200).json({status : true});
    }
    catch(e){
        res.status(400).json({status : false});
    }

} 