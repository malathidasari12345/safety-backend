const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentcontroller");

// Create a new appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getAppointments);

// Get a single appointment by ID
router.get("/:id", appointmentController.getAppointmentsByUserId);

// Update an appointment by ID
// router.put("/:id", appointmentController.updateAppointment);
router.get("/user/:userId", appointmentController.getAppointmentsByUserId);

// Delete an appointment by ID
// router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
