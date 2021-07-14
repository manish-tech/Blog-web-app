const multer = require('multer');
 const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,path.join(__dirname,'Images'));
    },
    filename : (req,file,callback)=>{
        callback(null,new Date().getTime() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,callback)=>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        callback(null,true);
    }
    else{
        callback(new Error('unsupported file',false));
    }
}

const upload = multer({
    storage : storage,
    limits :{
        fileSize : 1024*1024*10
    },
    fileFilter : fileFilter
});

const getDirname = ()=>{
    return __dirname;
}

module.exports = {
    upload : upload,
    getDirname : getDirname

}
