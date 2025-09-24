const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Multer setup for memory storage (Cloudinary handles file storage)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Create a recipe
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl;
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'UnityEats/recipes',
              resource_type: 'image',
              transformation: [
                { width: 800, height: 600, crop: 'fill', quality: 'auto' }
              ]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file.buffer);
        });
        
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Image upload failed', 
          error: uploadError.message 
        });
      }
    }
    
    const recipe = new Recipe({
      user: req.user.userId,
      title,
      content,
      image: imageUrl
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error('Recipe creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'name');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 