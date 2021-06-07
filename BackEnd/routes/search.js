const router = require("express").Router();
const {handleSearchFirstSome} = require("../controller/searchcontroller");

router.get("/",handleSearchFirstSome);
module.exports = router;