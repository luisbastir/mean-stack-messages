const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostController = require("../controllers/posts");



// Create post
router.post("/", checkAuth, extractFile, PostController.createPost);

// Get all posts
router.get("/", PostController.getPosts);

// Get post by id
router.get("/:id", PostController.getPost);

// Update post by id
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// Delete post by id
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
