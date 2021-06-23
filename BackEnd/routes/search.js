const router = require("express").Router();
const {handleSearch} = require("../controller/searchcontroller");

router.get("/",handleSearch);
module.exports = router;