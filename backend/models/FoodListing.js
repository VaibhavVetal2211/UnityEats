const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  image: String,
  region: String,
  state: String,
  dietary: String,
  type: String,
  portions: Number,
  expiration: Date,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'claimed', 'expired'], default: 'available' },
  spiceLevel: String,
  category: String,
  mealType: String,
  preparationTime: String,
  rating: Number,
  reviews: Number,
  servingTemperature: String,
  bestTimeToEat: String,
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  isJain: Boolean
}, { timestamps: true });

module.exports = mongoose.model('FoodListing', foodListingSchema); 