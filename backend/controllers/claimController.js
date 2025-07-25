const Claim = require('../models/Claim');
const FoodListing = require('../models/FoodListing');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.createClaim = async (req, res) => {
  try {
    const { foodListingId } = req.body;
    const food = await FoodListing.findById(foodListingId);
    if (!food || food.status !== 'available') {
      return res.status(400).json({ message: 'Food not available for claim' });
    }
    // Prevent donor from claiming their own food
    if (food.donor.toString() === req.user.userId) {
      return res.status(403).json({ message: 'You cannot claim your own donation.' });
    }
    const claim = new Claim({
      user: req.user.userId,
      foodListing: foodListingId
    });
    await claim.save();
    food.status = 'claimed';
    await food.save();

    // Send email to donor and claimant
    const donor = await User.findById(food.donor);
    const claimant = await User.findById(req.user.userId);
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: `${donor.email},${claimant.email}`,
      subject: 'Food Claimed Notification',
      text: `Food item '${food.title}' has been claimed by ${claimant.name} (${claimant.email}).`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 