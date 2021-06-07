const {searchFirst} = require("../database/post");
const handleSearchFirstSome = async (req,res)=>{
    try{
        const title = req.query.q;
        const result = await searchFirst(title);
        res.status(200).json({status : true , data : result.results});
    }
    catch(e){
        res.status(500).json({status : false , message : "internal server error"});
    } 
}

module.exports.handleSearchFirstSome = handleSearchFirstSome;

