const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { foodListingId, rating, comment } = req.body;
    // Prevent duplicate review by same user for same food
    const existing = await Review.findOne({ user: req.user.userId, foodListing: foodListingId });
    if (existing) return res.status(400).json({ message: 'You have already reviewed this food.' });
    const review = new Review({
      user: req.user.userId,
      foodListing: foodListingId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all reviews for a food listing
router.get('/:foodId', async (req, res) => {
  try {
    const reviews = await Review.find({ foodListing: req.params.foodId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 