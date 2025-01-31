const mongoose = require('mongoose');

// Define the FAQ schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create a model based on the schema
const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
