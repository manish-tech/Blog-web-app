const connection = require("./db");

const getCategoryNames = ()=>{
    return(
        new Promise((resolve,reject)=>{
            const query = `
                select * from category
            `
            connection.query(query,(err,results,fields)=>{
                if(!err){
                    resolve({results,fields});
                }
                else{
                    reject(err.sqlMessage);
                }
            });
        })

    );
}

module.exports.getCategoryNames = getCategoryNames;