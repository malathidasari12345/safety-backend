// models/Trainer.js
const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    bio: { type: String, required: true },
    qualification: { type: String, required: true },
    areas_of_expertise: { type: [String], required: true },
    contact: {
      phone: { type: Number, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
