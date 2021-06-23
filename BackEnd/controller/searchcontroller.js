const {getSearchData} = require("../database/post");

const handleSearch = async (req,res)=>{

    try{
        const { q , pageNumber } = req.query;
        const { results , limit } = await getSearchData(q,pageNumber);
        const data = {
                        results,
                        limit
                    }
        res.status(200).json({status : true ,data : data });
    }
    catch(e){
        res.status(500).json({status : false , message : "internal server error"});
    }
    
}

module.exports.handleSearch = handleSearch;

