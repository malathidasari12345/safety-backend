const BlogPost = require("../models/blog");

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, categories, tags, image, featured } = req.body;

    // Check if a blog post with the same title already exists
    const existingBlogPost = await BlogPost.findOne({ title });
    if (existingBlogPost) {
      return res
        .status(409)
        .json({ error: "Blog post with this title already exists" });
    }

    const newBlogPost = new BlogPost({
      title,
      content,
      categories,
      tags,
      image,
      featured,
    });

    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating blog post" });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate("comments");
    res.status(200).json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching blog posts" });
  }
};

// Get a single blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate(
      "comments"
    );
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching blog post" });
  }
};

// Update a blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating blog post" });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting blog post" });
  }
};
