const jwt = require('jsonwebtoken');

const createToken = (userName)=>{
    return(
        new Promise((resolve,reject)=>{
            jwt.sign({userName : userName },process.env.SECRET,{expiresIn : '1d'},(err,token)=>{
                if(!err){
                    resolve(token);
                }
                else{
                    reject(err);
                }
            });
        })       
    )
}

module.exports.createToken = createToken;







