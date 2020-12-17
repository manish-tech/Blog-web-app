const connection = require("./db");

const getAllPosts = (data)=>{
   
    return(
        new Promise((resolve,reject)=>{
            const offset = connection.escape(parseInt(data.offset));
            console.log(offset);
            const query =  `select post_id ,title , post_date , user_name , category_id , category_name , substring(content,1,100) as content
                            from post natural join category 
                            where post.category_id = category.category_id
                            limit 10 offset ${offset*10}`;
                                          
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
module.exports.getAllPosts = getAllPosts;

const setPost = (data)=>{
    return(
        new Promise((resolve,reject)=>{
            const title = connection.escape(data.title);
            const categoryId =  connection.escape(parseInt(data.categoryId));
            const content = connection.escape(data.content);
            const userName = connection.escape(data.userName);
            const query = "insert into post (title,content,post_date,user_name,category_id) values(" 
            + title +","+ content +","+ "current_timestamp" + ","+ userName +","+categoryId +")";
    
            connection.query(query,(error,results,fields)=>{
                if(!error){
                    resolve({results,fields})
                }
                else{
                    reject(error.sqlMessage);
                }
            });
        })
    );
}

module.exports.setPost = setPost;

const getCategoryPosts = (data)=>{
    return(
        new Promise((resolve,reject)=>{
            const offset = connection.escape(parseInt(data.offset));
            const categoryId = connection.escape(parseInt(data.categoryId));
            const query = `
                select * from post 
                where category_id = ${categoryId}
                limit 10 offset ${offset*10}
            `;

            connection.query(query,(error,results,fields)=>{
                if(!error){
                    resolve({results,fields});
                }

                else{
                    reject(error.sqlMessage);
                }
            })

        })
    );
}

module.exports.getCategoryPosts = getCategoryPosts;

const getOnePost = (data)=>{
    
    return (
        new Promise((resolve,reject)=>{
            const postId = connection.escape(parseInt(data.postId));
            const query = `
                select * from post natural join category
                where post_id = ${postId};
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

module.exports.getOnePost = getOnePost;