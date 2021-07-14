const mysql = require("mysql");
const pool =  mysql.createPool({
                        connectionLimit : 10,
                        user : process.env.DB_USER,
                        host : process.env.HOST,
                        database : process.env.DB_NAME,
                        password : process.env.DB_PASSWORD,
                        dateStrings : true
                    });

module.exports = pool;
