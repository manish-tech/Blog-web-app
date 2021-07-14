const {getProfilePic} = require('../database/user');
const verifyToken = require("./jwt/verifytoken");

const getUserProfilePic = async (req,res)=>{
    try{
        const {userName} = await verifyToken(req.cookies.token);
        const results = await getProfilePic(userName);
        

    }
    catch(error){
        console.log(error);
    }
}

module.exports.getUserProfilePic = getUserProfilePic;