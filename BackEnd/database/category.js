const pool = require("./db");

const getCategoryNames = ()=>{
    return(
        new Promise((resolve,reject)=>{
          
            pool.getConnection((err,connection)=>{
                const query = `
                select * from category
            `
                if(err){
                    reject(err);
                    connection.release();
                }
                else{
                    connection.query(query,(err,results,fields)=>{
                        if(!err){
                            resolve({results,fields});
                            connection.release();
                        }
                        else{
                            reject(err.sqlMessage);
                        }
                    });
                }
            })

        })

    );
}

module.exports.getCategoryNames = getCategoryNames;