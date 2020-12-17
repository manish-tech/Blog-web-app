const router = require("express").Router();
const {handleSubmitComment} = require("../controller/commentcontroller");
const {handleGetComments} = require("../controller/commentcontroller");

router.get("/comments",handleGetComments);
router.post("/submitComment",handleSubmitComment);


module.exports = router;