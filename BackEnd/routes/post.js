const router = require("express").Router();
const {handleGetOnePost} = require("../controller/postcontroler");

router.get("/:postId",handleGetOnePost);

module.exports = router;