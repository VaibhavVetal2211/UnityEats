const express = require('express');
const router = express.Router();
const FoodListing = require('../models/FoodListing');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create food listing
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    data.donor = req.user.userId;
    const food = new FoodListing(data);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
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
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const food = await FoodListing.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
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