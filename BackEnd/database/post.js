const connection = require("./db");

const getAllPosts = ({pageNumber})=>{
    let offset = 0;
    const limit = 3;
    if(pageNumber > 0){
        offset = pageNumber*limit;
    }
    return(
        new Promise((resolve,reject)=>{
            //frontend can know atleast 1 post is left so,limit + 1  
            let query =`select post_id ,title , post_date , user_name , category_id , substring(content,1,100) as content 
                        from post 
                        limit ${limit + 1} offset ${offset};`;
            
            connection.query(query,(error,results,fields)=>{
                if(!error){
                    results.push(limit+1);
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
    const pageNumber = parseInt(data.pageNumber);
    let offset = 0;
    const limit = 3;
    if(pageNumber > 0){
        offset = pageNumber*limit;
    }
    return(
        new Promise((resolve,reject)=>{
            
            const categoryId = connection.escape(parseInt(data.categoryId));
            const query = `
            select post_id ,title , post_date , user_name , substring(content,1,100) as content 
            from post 
            where category_id = ${categoryId}
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


const searchFirst = (title)=>{
    return(
        new Promise((resolve,reject)=>{
            const query = `select title ,post_id
                           from post
                           where title LIKE '%${title}%'
                           limit 5    
                            `
            connection.query(query,(error,results,fields)=>{
                if(!error){
                    resolve({results,fields});
                }
                else{
                    reject(error.sqlMessage);
                }
            })
        })
    )
}

module.exports.searchFirst = searchFirst;