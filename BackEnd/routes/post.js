const router = require("express").Router();
const {handleGetOnePost,handleUploadImagePost,handleGetPostImage} = require("../controller/postcontroler");
const imageUploader = require('../uploads/imageUploader');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get("/:postId",handleGetOnePost);
router.post('/postImage',isAuthenticated,imageUploader.upload.single('image'),handleUploadImagePost);
router.get('/getImage/:filename',isAuthenticated,handleGetPostImage);

module.exports = router;