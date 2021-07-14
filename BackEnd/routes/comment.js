const router = require("express").Router();
const { handleSubmitComment ,handleGetComments,handleSubmitReply,handleGetReplies} = require("../controller/commentcontroller");


router.get("/comments",handleGetComments);
router.post("/submitComment",handleSubmitComment);
router.post("/submitReply",handleSubmitReply);
router.get("/replies",handleGetReplies);


module.exports = router;