const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes
router.get("/", courseController.getAllCourses); // Fetch all courses
router.get("/:id", courseController.getCourseById); // Fetch a specific course by ID
router.post("/", courseController.createCourse); // Add a new course
router.put("/:id", courseController.updateCourse); // Update a course by ID
router.delete("/:id", courseController.deleteCourse); // Delete a course by ID
router.post("/:id/register", courseController.registerCourse); // Register for a course

module.exports = router;
