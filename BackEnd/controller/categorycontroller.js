const e = require("express");
const {getAllPosts }= require("../database/post");
const {getCategoryPosts} = require("../database/post");
const {getCategoryNames} = require("../database/category");

const handleGetPosts = (req,res)=>{
    const categoryParameter = req.params.category;
    const pageNumber = parseInt(req.query.pageNumber);

    if(categoryParameter == "all"){
     
        getAllPosts({pageNumber})
        .then((result)=>{
            res.status(200).json({status:true , data : result.results});
        })
        .catch((errorMessage)=>{
            res.status(400).json({status : false , message : errorMessage});
        });
    }

    else{
        getCategoryPosts(req.query)
        .then((result)=>{
            res.status(200).json({status : true , data : result.results});
        })
        .catch((errorMessage)=>{
            res.status(400).json({status : false, message : errorMessage});
        })
    }
}

module.exports.handleGetPosts = handleGetPosts;

const handlegetCategoryNames = (req,res)=>{
    getCategoryNames()
    .then((result)=>{
        res.json({status : true , data : result.results});
    })
    .catch((errorMessage)=>{
        res.status(400).json({status : false, message : errorMessage});
    })
    
}

module.exports.handlegetCategoryNames = handlegetCategoryNames;