const router = require("express").Router();
const {handleGetPosts} = require("../controller/categorycontroller");

router.get("/:category",handleGetPosts);
module.exports = router;