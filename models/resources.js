const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Guide", "eBook", "Infographic", "Article"],
    required: true,
  },
  file: {
    public_id: {
      type: String, // Cloudinary or file storage public ID
      required: true,
    },
    secure_url: {
      type: String, // File URL for downloading
      required: true,
    },
  },
  tags: [String], // Tags for categorization, such as safety, training, etc.
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Add virtual field for download URL (optional if you want to manipulate the URL later)
resourceSchema.virtual("downloadUrl").get(function () {
  return this.file.secure_url;
});

module.exports = mongoose.model("Resource", resourceSchema);
