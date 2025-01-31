const express = require('express');
const {
  saveImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
} = require('../controllers/galleryController');

const router = express.Router();

// POST route to save image details
router.post('/save-image', saveImage);

// GET route to fetch all images
router.get('/images', getImages);

// GET route to fetch a single image by ID
router.get('/images/:id', getImageById);

// PUT route to update image details
router.put('/images/:id', updateImage);

// DELETE route to delete an image
router.delete('/images/:id', deleteImage);

module.exports = router;
