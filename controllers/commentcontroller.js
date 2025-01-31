const Comment = require("../models/comment");
const User = require("../models/user");
const BlogPost = require("../models/blog");

// Controller for adding a comment
const addComment = async (req, res) => {
  const { blogPostId, userId, commentText } = req.body;
  console.log(blogPostId, userId, commentText);
  if (!blogPostId || !userId || !commentText) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new comment
    const newComment = new Comment({
      blogPostId,
      user: userId,
      commentText,
    });

    // Save the comment to the Comment collection
    await newComment.save();

    // Find the user who is adding the comment
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the comment's ObjectId to the user's comments array
    user.comments.push(newComment._id);
    await user.save();

    // Optionally, find the blog post (if needed)
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    return res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

// Controller to get all comments for a specific blog post
const getComments = async (req, res) => {
  const { blogPostId } = req.params;

  try {
    // Fetch all comments for this blog post
    const comments = await Comment.find({ blogPostId }).populate(
      "user",
      "FirstName LastName email"
    ); // Populate user details

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this blog post" });
    }

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

module.exports = { addComment, getComments };
