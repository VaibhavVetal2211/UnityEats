const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const auth = require('../middleware/auth');

// Sign up as a volunteer
router.post('/', auth, async (req, res) => {
  try {
    const { area, availability, message } = req.body;
    // Prevent duplicate volunteer sign-up for same user and area
    const existing = await Volunteer.findOne({ user: req.user.userId, area });
    if (existing) return res.status(400).json({ message: 'You have already signed up for this area.' });
    const volunteer = new Volunteer({
      user: req.user.userId,
      area,
      availability,
      message
    });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('user', 'name email');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all volunteer applications for a user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ user: req.params.userId });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 