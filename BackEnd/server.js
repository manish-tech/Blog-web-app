require("dotenv").config({path:__dirname + "/.env"});
const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let connection = require("./database/db.js");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const composepost = require("./routes/composepost");
const category = require("./routes/category");
const post = require("./routes/post");
const comment = require("./routes/comment");
const search = require("./routes/search");
const user = require('./routes/user');

const path = require("path");
const notification = require('./routes/notification');

app.use(express.static(path.join(__dirname ,'build')));

app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

app.use(authRouter);
app.use("/compose",composepost);
app.use("/category",category);
app.use("/post",post);
app.use("/comment",comment);
app.use("/search",search);
app.use('/notification',notification);
app.use('/user',user);



const PORT = process.env.PORT || 8080;
const HOST = "localhost";

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'build',"index.html"));
})

app.listen(PORT,()=>{
    console.log("listening to "+ PORT + "...");
})




