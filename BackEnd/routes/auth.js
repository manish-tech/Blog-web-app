const router = require("express").Router();
const handler = require("../controller/authcontroller")

router.post("/login",handler.login);
router.post("/register",handler.register);

module.exports = router;





