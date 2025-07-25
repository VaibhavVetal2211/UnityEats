const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodListing: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing', required: true },
  claimTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema); 