const connection = require("../database/db");

module.exports.insertUser = (body,hash)=>{

    return(
        new Promise((resolve,reject)=>{
            const userName = connection.escape(body.userName);
            const firstName = connection.escape(body.firstName);
            const lastName = connection.escape(body.lastName);
            const description = connection.escape(body.description);
            const insertQuery = 'insert into user values (' + userName + ',' + "'"+ hash +"'"+','+ firstName +','+ lastName +','+ description +')';
            connection.query(insertQuery,(err,results,fields)=>{
                if(!err){
                    resolve({results,fields});
                }else{
                    reject(err);
                }
            });
        })    
        
    )
}

module.exports.selectUser = (body)=>{
    return(
        new Promise((resolve,reject)=>{
            const userName = connection.escape(body.userName);
            connection.query("select hash from user where user_name=" + userName,(err,results,fields)=>{
                if(!err){
                    resolve({results,fields});
                }
                else{
                    reject(err);
                }
            });
        })
    )
}