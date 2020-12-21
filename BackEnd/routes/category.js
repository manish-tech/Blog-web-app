const router = require("express").Router();
const {handleGetPosts} = require("../controller/categorycontroller");
const {handlegetCategoryNames} = require("../controller/categorycontroller");

router.get("/getCategoryNames",handlegetCategoryNames);
router.get("/:category",handleGetPosts);

module.exports = router;