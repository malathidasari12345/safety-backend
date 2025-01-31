const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourcescontroller");

// Add a new resource
router.post("/", resourceController.addResource);

// Update an existing resource
router.put("/:id", resourceController.updateResource);

// Delete a resource
router.delete("/:id", resourceController.deleteResource);

// Get all resources
router.get("/", resourceController.getAllResources);

// Get a resource by ID
router.get("/:id", resourceController.getResourceById);

module.exports = router;
