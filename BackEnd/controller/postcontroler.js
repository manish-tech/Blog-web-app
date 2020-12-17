const verifyToken = require("./jwt/verifytoken");
const {getOnePost} = require("../database/post");


const handleGetOnePost = (req,res)=>{

    verifyToken(req.cookies.token)
    .then((decoded)=>{
        return getOnePost(req.params);
    })
    .then((result)=>{
        res.status(200).json({status : true , data : result.results});
    })
    .catch((errorMessage)=>{
        res.status(400).json({status : false , message : errorMessage});
    })
}

module.exports.handleGetOnePost = handleGetOnePost;
