const { handleGetNotifications ,handleRead} = require("../controller/notificationcontroller");
const router = require("express").Router();


router.get('/getNotifications',handleGetNotifications);
router.patch('/markRead',handleRead);

module.exports = router;