const pool = require("./db");

const getAllPosts = ({pageNumber})=>{
    let offset = 0;
    const limit = 5;
    if(pageNumber > 0){
        offset = pageNumber*limit;
    }
    return(
        new Promise((resolve,reject)=>{
            //frontend can know atleast 1 post is left so,limit + 1  
            let query =`select post.post_id ,post.title , post.post_date , post.user_name , post.category_id , substring(headline,1,100) as headline,user.profile_pic_url as url 
                        from post ,user
                        where post.user_name=user.user_name
                        order by post.post_date DESC
                        limit ${limit + 1} offset ${offset};`;
            
           pool.getConnection((err,connection)=>{
               if(err){
                   reject(err);
                   connection.release();
               }else{
                   connection.query(query,(error,results,fields)=>{
                    if(!error){
                        results.push(limit+1);
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
module.exports.getAllPosts = getAllPosts;

const setPost = (data)=>{

    return(
        new Promise((resolve,reject)=>{
           
            
            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const title = connection.escape(data.title);
                    const categoryId =  connection.escape(parseInt(data.categoryId));
                    const content = connection.escape(data.content);
                    const userName = connection.escape(data.userName);
                    const headline =  connection.escape(data.headline);
                    const query = "insert into post (title,content,post_date,user_name,category_id,headline) values(" 
                    + title +","+ content +","+ "current_timestamp" + ","+ userName +","+categoryId +','+headline+")";
                    connection.query(query,(error,results,fields)=>{
                        if(!error){
                            resolve({results,fields})
                        }
                        else{
                            reject(error.sqlMessage);
                        }
                        connection.release();
                    });
                }
            })
        })
    );
}

module.exports.setPost = setPost;

const getCategoryPosts = (data)=>{
    const pageNumber = parseInt(data.pageNumber);
    let offset = 0;
    const limit = 5;
    if(pageNumber > 0){
        offset = pageNumber*limit;
    }
    return(
        new Promise((resolve,reject)=>{
            
            

            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const categoryId = connection.escape(parseInt(data.categoryId));
                    const query = `
                    select post.post_id ,post.title , post.post_date , post.user_name , post.category_id , substring(headline,1,100) as headline,user.profile_pic_url as url 
                    from post ,user
                    where category_id = ${categoryId} and post.user_name=user.user_name
                    order by post.post_date DESC
                    limit ${limit+1} offset ${offset}
                    `;
                    connection.query(query,(error,results,fields)=>{
                        if(!error){
                            results.push(limit+1); 
                            resolve({results,fields});
                        }
        
                        else{
                            reject(error.sqlMessage);
                        }
                        connection.release();
                    })
                }
            })

        })
    );
}

module.exports.getCategoryPosts = getCategoryPosts;

const getOnePost = (data)=>{
    
    return (
        new Promise((resolve,reject)=>{
            

            pool.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                    connection.release();
                }else{
                    const postId = connection.escape(parseInt(data.postId));
                    const query = `
                        select post.user_name,post.category_id,category.category_name,post.content, post.post_date,post.post_id,post.title,user.profile_pic_url as url from post ,category,user
                        where post_id = ${postId} and post.user_name=user.user_name and post.category_id=category.category_id;
                    `;
                    connection.query(query,(error,results,fields)=>{
                        if(!error){
                        
                            resolve({results,fields});
                        }
                        else{
                            reject(error.sqlMessage);
                        }
                        connection.release();
                    });
                }
            })
        })

    );


}

module.exports.getOnePost = getOnePost;


const getSearchData = (title,pageNumber)=>{
    let offset = 0;
    let limit = 10;
    //page number is string
    if(pageNumber){
       
        pageNumber = parseInt(pageNumber);
        
        if(pageNumber > 0){
            limit = 5;
            offset = pageNumber*limit;
            offset += 5;
        }
    }else{
        limit = 5;
    }

    return(
        new Promise((resolve,reject)=>{
            
           

                           pool.getConnection((err,connection)=>{
                            if(err){
                                reject(err);
                                connection.release();
                            }else{
                                const query = ` select post.title ,post.post_id ,user.profile_pic_url as url${ pageNumber != undefined ? ",post.post_date , post.user_name , post.category_id ,  substring(headline,1,100) as headline,user.profile_pic_url as url": ""}
                                from post , user
                                where title LIKE ${connection.escape("%"+title+"%")} and post.user_name=user.user_name
                                order by post.post_date DESC
                                limit ${ limit } offset ${ offset }   
                               `
                                connection.query(query,(error,results,fields)=>{
                                    if(!error){
                                        resolve({results,fields,limit});
                                    }
                                    else{
                                        
                                        reject(error.sqlMessage);
                                    }
                                    connection.release();
                                })
                            }
                        })
        })
    )
}

module.exports.getSearchData = getSearchData;
