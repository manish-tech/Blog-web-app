const verifyToken = require("./jwt/verifytoken");
const {setPost} = require("../database/post");

const handleComposePost = (req,res)=>{
    const token = req.cookies.token;
    verifyToken(token)
    .then((decoded)=>{
        return setPost(req.body);
    })
    .then((result)=>{
        res.status(200).json({status : true , message : "succesfully submitted the post"});
    })
    .catch((errorMessage)=>{
        res.status(400).json({status : false , message : errorMessage});
    })
}
module.exports.handleComposePost = handleComposePost;