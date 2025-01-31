const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: false }, // URL for course icon
    methodologies: { type: [String], required: true }, 
    category: { type: String, required: true },
    tools: { type: [String], required: true },
    benefits: { type: [String], required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    registrationCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
