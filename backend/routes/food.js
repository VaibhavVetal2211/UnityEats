const express = require('express');
const router = express.Router();
const FoodListing = require('../models/FoodListing');
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

// Create food listing
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'UnityEats/food-listings',
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
        
        data.image = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Image upload failed', 
          error: uploadError.message 
        });
      }
    }
    
    data.donor = req.user.userId;
    const food = new FoodListing(data);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    console.error('Food listing creation error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all food listings
router.get('/', async (req, res) => {
  try {
    const foods = await FoodListing.find().populate('donor', 'name email');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all food listings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const foods = await FoodListing.find({ donor: req.params.userId }).populate('donor', 'name email');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single food listing
router.get('/:id', async (req, res) => {
  try {
    const food = await FoodListing.findById(req.params.id).populate('donor', 'name email');
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update food listing
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    
    // Upload new image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'UnityEats/food-listings',
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
        
        data.image = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: 'Image upload failed', 
          error: uploadError.message 
        });
      }
    }
    
    const food = await FoodListing.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
    console.error('Food listing update error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete food listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const food = await FoodListing.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 