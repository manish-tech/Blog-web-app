const verifyToken = require("./jwt/verifytoken");
const {setComment} = require("../database/comment");
const {getComments} = require("../database/comment");

const handleSubmitComment = (req,res)=>{
    verifyToken(req.cookies.token)
    .then((decoded)=>{
        return setComment(req.body);
    })
    .then((result)=>{
        
        return getComments({postId : req.body.postId})   
    })
    .then((result)=>{
        res.status(200).json({status : true , data : result.results});
    })
    .catch((errorMessage)=>{
        res.status(400).json({status : false , message : errorMessage})
    });
}

module.exports.handleSubmitComment = handleSubmitComment;

const handleGetComments = (req,res)=>{
    
    verifyToken(req.cookies.token)
    .then((decoded)=>{
        return getComments(req.query);
    })
    .then((result)=>{
        res.status(200).json({status : true , data : result.results});
    })
    .catch((errorMessage)=>{
        res.status(400).json({status : false , message : errorMessage});
    })
}

module.exports.handleGetComments = handleGetComments;