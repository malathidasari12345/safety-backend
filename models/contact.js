const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  question:{ type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
