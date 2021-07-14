const pool = require("./db");

const insertComment = async (data,connection)=>{
    return(
        new Promise((resolve,reject)=>{
            const postId = connection.escape(parseInt(data.postId));
            const userName = connection.escape(data.userName);
            const content = connection.escape(data.content);
            const query = `
                insert into comment (user_name,post_id,date_of_comment,content,parent_commentid,children_count) 
                values(${userName},${postId},current_timestamp,${content},null,'0');
             `;
                           
            connection.query(query,(error,results,fields)=>{
            
                if(!error){
                    resolve(results);
                    
                }
                else{
                    reject(error.sqlMessage);
                }
            });
                      
        })
    );
}
const insertCommetNotification = ({commentId,postId,userName,content},connection)=>{
    return (
        new Promise((resolve,reject)=>{
            const query = `
                insert into notification (from_username,to_username,post_id,comment_id,is_read,message)
                select ${userName},user_name,${postId},${commentId},false,${connection.escape('commeted : ' + content)}
                from post where post_id = ${postId}
            `;
  
            connection.query(query,(error,results,fields)=>{
                if(error){
                    reject(error.sqlMessage);
                }
                else{
                    resolve(results);
                }
            })  
        })
    )
}

const setComment = (data)=>{
    return(
        new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    
                }
                else{
                    connection.beginTransaction(async(error)=>{
                        if(error){
                            reject(error.sqlMessage);
                            connection.release();
                            connection.rollback((error)=>{    
                            
                            })
                            return;
                        }
        
                        const postId = connection.escape(parseInt(data.postId));
                        const userName = connection.escape(data.userName);
                        const content = data.content;
                        try{
                            const { insertId : commentId } = await insertComment(data,connection);
                            await insertCommetNotification({postId,userName,content,commentId},connection);
                            connection.commit(function(err) {
                                if (err) {
                                    reject(err);  
                                }
                                else{
                                    resolve();
                                }
                                connection.release();
                            });
                        }
                        catch(error){
                            reject(error);
                            connection.release();
                        }
        
                    })
                }
            })
        })
    );
}

module.exports.setComment = setComment;

const getComments = (data)=>{
    return(
        new Promise((resolve,reject)=>{


            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }
                else{

                    const postId = connection.escape(parseInt(data.postId));
                    
                    const query = `
                        select user.profile_pic_url as url,comment.comment_id,comment.user_name,comment.post_id,comment.content,comment.date_of_comment,comment.parent_commentid,comment.children_count from comment,user
                        where comment.post_id = ${postId} and comment.parent_commentid is null and user.user_name = comment.user_name
                    `;
        
                    connection.query(query,(error,results,fields)=>{
                        if(!error){              
                            resolve({results,fields});
                        }
        
                        else{
                            console.log(error.sqlMessage);
                            reject(error.sqlMessage);
                        }
                        connection.release();
                    });
                }
            })
        })
    );
}

module.exports.getComments = getComments;


const incrementChildrenCount = (parentCommentId,connection)=>{
    
    return new Promise((resolve,reject)=>{
        const query = `
            update comment set children_count = children_count + 1
            where comment_id = ${connection.escape(parentCommentId)}
        `   
        connection.query(query,(error, results, fields)=>{
            if(error){
                console.log(error);
                reject(error);        
            }
            else{
                resolve();       
            }
        })

    })
};

const insertReply = ({parentCommentId,userName,postId,content},connection)=>{
    return new Promise((resolve,reject)=>{
        const query = `
            insert into comment(user_name,post_id,date_of_comment,content,parent_commentid,children_count)
            values (${connection.escape(userName)},${connection.escape(postId)},current_timestamp,${connection.escape(content)},${connection.escape(parentCommentId)},'0')
        `;
       
        connection.query(query,(error, results, fields)=>{
            if(error){    
                reject(error);
            }
            else{
                const {insertId} = results;
                resolve(insertId);
            }

        })
            
    })
}

const getReplies = ({parentCommentId})=>{
    return (
        new Promise((resolve,reject)=>{
            
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }
                else{
                const query = `
                select  user.profile_pic_url as url,comment.comment_id,comment.user_name,comment.post_id,comment.content,comment.date_of_comment,comment.parent_commentid,comment.children_count
                from comment,user 
                where parent_commentid = ${connection.escape(parentCommentId)} and user.user_name = comment.user_name   
            `
                    connection.query(query,(error,results,fields)=>{
                        if(error){
                            reject(error.sqlMessage);
                        }
                        else{
                            resolve({results,fields});
                        }
                        connection.release();
                    })
                }
            })
        })
    )
}

const getTwoComments = ({commentId,parentCommentId},connection)=>{
    return (
        new Promise((resolve,reject)=>{

            const query = `
                select * from comment where comment_id in (${connection.escape(commentId)},${connection.escape(parentCommentId)})
                order by date_of_comment       
            `;
            connection.query(query,(error,results,fields)=>{
                if(error){
                    console.log(error)
                    reject(error.sqlMessage);
                }
                else{
                  
                    resolve({results});
                }
            })
        })
    )
}

module.exports.getReplies = getReplies;

const insertReplyNotification = ({commentId,postId,userName,content,parentCommentId,parentContent},connection)=>{
    return (
        new Promise((resolve,reject)=>{
            const query = `
                insert into notification (from_username,to_username,post_id,comment_id,is_read,message)
                select ${connection.escape(userName)},user_name,${connection.escape(postId)},${connection.escape(commentId)},false,${connection.escape('replied :' +content )}
                from comment where comment_id = ${parentCommentId}; 
            `;

            connection.query(query,(error,results,fields)=>{
                if(error){
                    reject(error.sqlMessage);
                }
                else{
                    resolve(results);
                }
            })
        })
    )
}


const setReply = ({parentCommentId,userName,postId,content})=>{
    return(
        new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    connection.beginTransaction( async (error)=>{
                        if(error){
                            reject(error.sqlMessage);
                            connection.release();
                            connection.rollback((error)=>{    
                            
                            })
                            return;
                        }
        
                        try{
                            const [update,commentId] = await Promise.all(
                                [incrementChildrenCount(parentCommentId,connection),
                                 insertReply({parentCommentId,userName,postId,content},connection)
                                ]);
                    
                            
                            const {results} = await getTwoComments({commentId,parentCommentId},connection);
                          
                            const [ parentReplyData , replyData ] = results;    
                            const { content : parentContent } = parentReplyData;
                            await insertReplyNotification({commentId,postId,userName,content,parentCommentId,parentContent},connection)
                           
                            connection.commit(function(err) {
                                if (err) {
                                    reject(err);
                                }
                                else{
                                    resolve({
                                        results : replyData
                                    });
                                }

                                connection.release();
                            });    
                            
                        }
                        catch(error){
                            console.log(error,);
                            connection.rollback((error)=>{    
                            
                            })
                            reject(error);
                            connection.release();
                        }
                    })
                }
            })
        })
    )
}

module.exports.setReply = setReply;