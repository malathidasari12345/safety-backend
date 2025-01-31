const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controllers/commentcontroller"); // Adjust with your correct path

// POST route to add a comment to a blog post
router.post("/add-comment", addComment);

// GET route to get all comments for a specific blog post
router.get("/:blogPostId", getComments);

module.exports = router;
