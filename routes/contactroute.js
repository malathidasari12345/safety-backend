const express = require("express");
const { submitContactForm } = require("../controllers/contactcontroller");
const router = express.Router();

// POST /contact
router.post("/", submitContactForm);

module.exports = router;
