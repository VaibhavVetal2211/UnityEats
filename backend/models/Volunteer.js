const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  area: { type: String, required: true },
  availability: { type: String, required: true },
  message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema); 