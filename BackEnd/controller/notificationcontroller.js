const {getNotifications,markRead} = require('../database/notification');
const verifyToken = require('../controller/jwt/verifytoken');
const handleGetNotifications = async(req,res)=>{
    
    try{    
        const { userName } = await verifyToken(req.cookies.token);
        const results = await getNotifications(userName);
        res.status(200).json({status : true,data : results});
    }
    catch(e){
        console.log(e);
        res.status(500).json({status : false});
    }
}

module.exports.handleGetNotifications = handleGetNotifications;

const handleRead = async(req,res)=>{
   
    try{
        await verifyToken(req.cookies.token);
        await markRead(req.body.notificationId);
        res.status(200).json({status : true});
    }
    catch(e){
        console.log(e);
        res.status(500).json({status : false});
    }

}
module.exports.handleRead = handleRead;
