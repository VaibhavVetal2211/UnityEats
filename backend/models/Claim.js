const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodListing: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodListing', required: true },
  claimTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

// Ensure only one active claim (pending/approved) exists per food listing at a time
// This complements transactional update in controller to enforce single-winner semantics
try {
  claimSchema.index(
    { foodListing: 1 },
    {
      unique: true,
      partialFilterExpression: { status: { $in: ['pending', 'approved'] } }
    }
  );
} catch (e) {
  // Index creation errors are logged by Mongoose on startup; no-op here
}

module.exports = mongoose.model('Claim', claimSchema); 