const connection = require("./db");

const setComment = (data)=>{
    return(
        new Promise((resolve,reject)=>{
            const postId = connection.escape(parseInt(data.postId));
            const userName = connection.escape(data.userName);
            const content = connection.escape(data.content);
            const query = `
                insert into comment (user_name,post_id,date_of_comment,content) 
                values(${userName},${postId},current_timestamp,${content});
             `;
            connection.query(query,(error,results,fields)=>{
                
                if(!error){
                    
                    resolve({results,fields});
                }
                else{
                    resolve(error.sqlMessage);
                }
            });
        })
    );

}

module.exports.setComment = setComment;

const getComments = (data)=>{
    return(
        new Promise((resolve,reject)=>{
            const postId = connection.escape(parseInt(data.postId));
            
            const query = `
                select * from comment
                where post_id = ${postId}
            `;

            connection.query(query,(error,results,fields)=>{
                if(!error){
                    resolve({results,fields});
                }

                else{
                    reject(error.sqlMessage);
                }
            });
        })
    );
}

module.exports.getComments = getComments;