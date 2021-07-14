const verifyToken = require("./jwt/verifytoken");
const {setComment,getComments,setReply,getReplies} = require("../database/comment");

const handleSubmitComment = (req,res)=>{
    verifyToken(req.cookies.token)
    .then((decoded)=>{
        return setComment(req.body);
    })
    .then(()=>{
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

const handleSubmitReply = async (req,res)=>{
   
    try{
        const decoded = await verifyToken(req.cookies.token);
        const {parentCommentId,userName,postId,content} = req.body;
        const {results} = await setReply({parentCommentId,userName,postId,content});
        res.status(200).json({status : true,data : results});
    }

    catch(error){
        res.status(500).json({status : false});
    }
    
}

module.exports.handleSubmitReply = handleSubmitReply;

const handleGetReplies = async (req,res)=>{
    try{
        const decoded = await verifyToken(req.cookies.token)
        const {parentCommentId} = req.query;
        const {results} = await getReplies({parentCommentId});
        res.status(200).json({status : true , data : results});
    }
    catch(error){
        res.status(400).json({status : false});
    }
}

module.exports.handleGetReplies = handleGetReplies;