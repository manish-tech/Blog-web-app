require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { unlink } = require('fs');
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET 
})

module.exports.cloudinary = cloudinary;

const uploadImageToCloudinary = async(req,upload_preset)=>{
    
    try{
        const uploadResponse = await cloudinary.uploader.upload(
            req.file.path,{
                upload_preset : upload_preset
            }
        )
        const { url } = uploadResponse;
        unlink(req.file.path,(err)=>{
            if(err)
                throw err;
            else{
                console.log(req.file.filename +' deleted');
            }
        });
        return Promise.resolve({ src : url })
        
    }

    catch(error){
        console.log(error,'handleUploadImagePost');
        return Promise.reject(error);
    }
}

module.exports.uploadImageToCloudinary = uploadImageToCloudinary;