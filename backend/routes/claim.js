const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const FoodListing = require('../models/FoodListing');
const auth = require('../middleware/auth');
const claimController = require('../controllers/claimController');

// Create a claim
router.post('/', auth, claimController.createClaim);

// Get all claims (admin or for user)
router.get('/', auth, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.userId };
    const claims = await Claim.find(filter).populate('user', 'name email').populate('foodListing');
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all claims for a user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.params.userId }).populate('foodListing');
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single claim
router.get('/:id', auth, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id).populate('user', 'name email').populate('foodListing');
    if (!claim) return res.status(404).json({ message: 'Not found' });
    // Only allow owner or admin
    if (claim.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update claim (status, pickup info)
router.put('/:id', auth, async (req, res) => {
  try {
    const update = req.body;
    const claim = await Claim.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!claim) return res.status(404).json({ message: 'Not found' });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 