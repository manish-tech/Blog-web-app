const mysql = require("mysql");
const connection =  mysql.createConnection({
                        user : process.env.DB_USER,
                        host : process.env.HOST,
                        database : process.env.DB_NAME,
                        password : process.env.DB_PASSWORD
                    });

module.exports = connection;
