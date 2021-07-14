const router = require("express").Router();
const handler = require("../controller/authcontroller")
const imageUploader = require('../uploads/imageUploader');

router.post("/login",handler.login);
router.post("/register",handler.register);
router.post("/profilePic",imageUploader.upload.single('image'),handler.uploadProfilePic);
router.get("/isAuthenticated",handler.isAuthenticated);
router.get("/logout",handler.logout);

module.exports = router;





