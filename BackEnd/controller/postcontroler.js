const verifyToken = require("./jwt/verifytoken");
const path = require('path');
const {getOnePost} = require("../database/post");
const {getDirname} = require('../uploads/imageUploader');
const { uploadImageToCloudinary } = require('../utils/cloudinary');


const handleGetOnePost = (req,res)=>{

    verifyToken(req.cookies.token)
    .then((decoded)=>{
        return getOnePost(req.params);
    })
    .then((result)=>{
        const {results} = result;
        res.status(200).json({status : true , data : results[0]});
    })
    .catch((errorMessage)=>{
        console.log(errorMessage);
        res.status(400).json({status : false , message : errorMessage});
    })
}

module.exports.handleGetOnePost = handleGetOnePost;

const handleUploadImagePost = async(req,res)=>{
    try{
        const { src } = await uploadImageToCloudinary(req,'create-blog-app-post-images');
        res.status(201).json({ src : src });
    }
    catch(error){
        console.log(error,'handleUploadImagePost');
        res.status(500).json({message : 'something went wrong !'});
    }

}

module.exports.handleUploadImagePost = handleUploadImagePost;

const handleGetPostImage = (req,res)=>{
    const filename = req.params.filename;
    console.log(path.join(getDirname(),'postImages',filename))
    res.sendFile(path.join(getDirname(),'postImages',filename),{},(err)=>{
        if(err)
            res.status(403);
        else
            res.status(200);
    });
}

module.exports.handleGetPostImage = handleGetPostImage;