// routes/trainerRoutes.js
const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");

// Get all trainers
router.get("/", trainerController.getTrainers);

// Get trainer by ID
router.get("/:id", trainerController.getTrainerById);

// Create a new trainer
router.post("/", trainerController.createTrainer);

// Update an existing trainer
router.put("/:id", trainerController.updateTrainer);

// Delete a trainer
router.delete("/:id", trainerController.deleteTrainer);

module.exports = router;
