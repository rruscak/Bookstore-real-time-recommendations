const router = require('express').Router();

const auth = require('../middleware/auth');
const multer = require('multer');
const multerConf = require('../configurators/multer');

const PostsController = require('../controllers/posts');

// multerConf.cleanFolder('uploads/images');
// Multer configuration
let upload = multer({
  storage: multerConf.imagesUploads
});

// Create post
router.post("", auth, upload.single("image"), PostsController.createPost);
// Update post
router.put("", auth, upload.single("image"), PostsController.updatePost);
// Get by id
router.get("/:id", PostsController.getPost);
// Get all posts
router.get("", PostsController.getAllPosts);
// Delete post
router.delete("/:id", auth, PostsController.deletePost);

module.exports = router;
