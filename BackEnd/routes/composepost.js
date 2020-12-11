const router = require("express").Router();
const { isAuthenticated }= require("../controller/authcontroller")
const {handleComposePost} = require("../controller/composecontroler");

router.get("/isAuthenticated",isAuthenticated);
router.post("/submitPost",handleComposePost);

module.exports = router;