const Resource = require("../models/resources"); // Assuming the model is in the models directory

// Add a new resource
exports.addResource = async (req, res) => {
  try {
    const { title, description, type, file, tags } = req.body;
    console.log(title, description, type, file, tags);
    // Check if a resource with the same title already exists
    const existingResource = await Resource.findOne({ title });

    if (existingResource) {
      return res
        .status(400)
        .json({ message: "Resource with this title already exists" });
    }

    // Create a new resource document
    const newResource = new Resource({
      title,
      description,
      type,
      file,
      tags,
    });

    // Save the resource to the database
    const savedResource = await newResource.save();

    res.status(201).json(savedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding resource" });
  }
};

// Update an existing resource
exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, file, tags } = req.body;

    // Find the resource and update it
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { title, description, type, file, tags, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating resource" });
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the resource
    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting resource" });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resources" });
  }
};

// Get resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resource" });
  }
};
