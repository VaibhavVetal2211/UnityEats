const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodListing: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema); 