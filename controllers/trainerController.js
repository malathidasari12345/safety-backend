// controllers/trainerController.js
const Trainer = require("../models/trainer");

// Fetch all trainers
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainers", error });
  }
};

// Get individual trainer profile
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer", error });
  }
};

// Create a new trainer

// Create a new trainer or update an existing one
exports.createTrainer = async (req, res) => {
  const { name, photo, bio, qualification, areas_of_expertise, contact } =
    req.body;

  try {
    // Check if the trainer already exists by name or contact (e.g., phone or email)
    const existingTrainer = await Trainer.findOne({
      $or: [
        { name: name }, // Check if a trainer with this name already exists
        { "contact.email": contact.email }, // Check if a trainer with this email exists
        { "contact.phone": contact.phone }, // Check if a trainer with this phone exists
      ],
    });

    if (existingTrainer) {
      return res
        .status(400)
        .json({
          message: "Trainer with the same name or contact already exists",
        });
    }

    // If trainer does not exist, create a new trainer
    const newTrainer = new Trainer({
      name,
      photo,
      bio,
      qualification,
      areas_of_expertise,
      contact,
    });

    const savedTrainer = await newTrainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(500).json({ message: "Error saving trainer", error });
  }
};

// Update trainer's information
exports.updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer", error });
  }
};

// Delete trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer", error });
  }
};
