const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogcontroller");

// Blog Post Routes
router.post("/", blogPostController.createBlogPost); // Create a new blog post
router.get("/", blogPostController.getAllBlogPosts); // Get all blog posts
router.get("/:id", blogPostController.getBlogPostById); // Get a single blog post by ID
router.put("/:id", blogPostController.updateBlogPost); // Update a blog post
router.delete("/:id", blogPostController.deleteBlogPost); // Delete a blog post

module.exports = router;
