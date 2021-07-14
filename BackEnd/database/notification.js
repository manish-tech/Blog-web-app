const pool = require("./db");

const getNotifications = (userName)=>{
    return (
        new Promise((resolve,reject)=>{
         

            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }
                else{
                    const query = `
                    select * from notification where 
                    to_username = ${connection.escape(userName)} and is_read = false
                `;
                    connection.query(query,(error,results,fields)=>{
                        if(error)
                            reject(error.sqlMessage);
                        else
                            resolve(results);
                        connection.release();
                    });
                    
                }
            })

        })
    )
}

module.exports.getNotifications = getNotifications;

const markRead = (notificationId)=>{
    return(
        new Promise((resolve,reject)=>{
         
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }
                else{
                    const query = `update notification 
                    set is_read = true
                    where notification_id=${connection.escape(notificationId)}
                `
                    connection.query(query,(error,results,fields)=>{
                        if(error){
                            console.log(error.sqlMessage)
                            reject(error.sqlMessage);
                        }
                        else
                            resolve(results);
                        connection.release();   
                    });
                }
            })

        })
    )
} 
module.exports.markRead = markRead;