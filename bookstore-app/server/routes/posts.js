const router = require('express').Router();
const PostsController = require('../controllers/posts');
const auth = require('../middleware/auth');
const extractFile = require('../middleware/file');

// extractFile.cleanFolder('uploads/images');

// Create post
router.post("", auth, extractFile, PostsController.createPost);
// Update post
router.put("", auth, extractFile, PostsController.updatePost);
// Get by id
router.get("/:id", PostsController.getPost);
// Get all posts
router.get("", PostsController.getAllPosts);
// Delete post
router.delete("/:id", auth, PostsController.deletePost);

module.exports = router;
