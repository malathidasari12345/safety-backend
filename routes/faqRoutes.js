const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");

// Get all FAQs
router.get("/", faqController.getAllFAQs);

// Create a new FAQ
router.post("/", faqController.createFAQ);

// Update an existing FAQ
router.put("/:id", faqController.updateFAQ);

// Delete an FAQ
router.delete("/:id", faqController.deleteFAQ);

module.exports = router;
