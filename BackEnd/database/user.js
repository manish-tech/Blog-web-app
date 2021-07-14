const pool = require("../database/db");

module.exports.insertUser = (body,hash)=>{

    return(
        new Promise((resolve,reject)=>{
            
            
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const userName = connection.escape(body.userName);
                    const firstName = connection.escape(body.firstName);
                    const lastName = connection.escape(body.lastName);
                    const description = connection.escape(body.description);
                    const url = connection.escape(body.url);
                    const insertQuery = 'insert into user values (' + userName + ',' + "'"+ hash +"'"+','+ firstName +','+ lastName +','+ description +','+url+')';
                    connection.query(insertQuery,(err,results,fields)=>{
                        if(!err){
                            resolve({results,fields});
                        }else{
                            reject(err.sqlMessage);
                        }
                    });
                    connection.release();
                }
            })
            
            
        })    
        
    )
}

module.exports.selectUser = (body)=>{
    return(
        new Promise((resolve,reject)=>{
            

            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const userName = connection.escape(body.userName);
                    connection.query("select * from user where user_name=" + userName,(err,results,fields)=>{
                        if(!err){
                            resolve({results,fields});
                        }
                        else{
                            reject(err);
                        }
                        connection.release();
                    });
                }
            })

        })
    )
}

module.exports.getProfilePic = (userName)=>{
    return(
        new Promise((resolve,reject)=>{
            

            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const userName = connection.escape(userName);
                    connection.query("select profile_pi_url from user where user_name=" + userName,(err,results,fields)=>{
                        if(!err){
                            resolve(results);
                        }
                        else{
                            reject(err);
                        }
                        connection.release();
                    });
                }
            })
        })
    )
}
