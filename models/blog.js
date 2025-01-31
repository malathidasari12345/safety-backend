const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
    categories: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
