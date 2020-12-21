const router = require("express").Router();
const handler = require("../controller/authcontroller")

router.post("/login",handler.login);
router.post("/register",handler.register);
router.get("/isAuthenticated",handler.isAuthenticated);
router.get("/logout",handler.logout);

module.exports = router;





