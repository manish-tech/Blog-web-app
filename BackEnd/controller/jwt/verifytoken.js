const jwt = require("jsonwebtoken");

const verifyToken = (claimToken)=>{
    return (
        new Promise((resolve,reject)=>{
            jwt.verify(claimToken,process.env.SECRET,(err,decoded)=>{
                if(!err){
                    resolve(decoded);
                }else{
                    reject(err);
                }
            })
        })

    );
} 