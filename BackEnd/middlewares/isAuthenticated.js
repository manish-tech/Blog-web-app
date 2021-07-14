const verifyToken = require("../controller/jwt/verifytoken");

const isAuthenticated = (req,res,next)=>{
    const cookies = req.cookies;
    if(cookies.token){
        verifyToken(cookies.token)
        .then((decoded)=>{
           next();
        })
        .catch((err)=>{
            res.status(400).json({status : false});
            return;
        })
    }
    else{
        res.status(400).json({status : false});
    }
}

module.exports = isAuthenticated;