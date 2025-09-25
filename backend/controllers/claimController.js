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
  const session = await Claim.startSession();
  try {
    const { foodListingId } = req.body;

    await session.withTransaction(async () => {
      // Atomically reserve the food: only if status is 'available'
      const food = await FoodListing.findOneAndUpdate(
        { _id: foodListingId, status: 'available' },
        { $set: { status: 'claimed' } },
        { new: true, session }
      );

      if (!food) {
        throw new Error('Food not available for claim');
      }

      // Prevent donor from claiming their own food
      if (food.donor.toString() === req.user.userId) {
        throw new Error('You cannot claim your own donation.');
      }

      // Create the claim inside the same transaction
      await Claim.create([
        { user: req.user.userId, foodListing: foodListingId }
      ], { session });
    });

    // After successful commit, fetch entities for response and send notifications
    const claim = await Claim.findOne({ user: req.user.userId, foodListing: req.body.foodListingId })
      .populate('foodListing')
      .populate('user', 'name email');

    try {
      const food = await FoodListing.findById(req.body.foodListingId).populate('donor', 'name email');
      const claimant = await User.findById(req.user.userId);
      if (food && food.donor && claimant) {
        const mailOptions = {
          from: process.env.FROM_EMAIL,
          to: `${food.donor.email},${claimant.email}`,
          subject: 'Food Claimed Notification',
          text: `Food item '${food.title}' has been claimed by ${claimant.name} (${claimant.email}).`,
        };
        transporter.sendMail(mailOptions).catch(() => {});
      }
    } catch (_) {
      // Email failures should not break the API success
    }

    return res.status(201).json(claim);
  } catch (err) {
    const message = err && err.message ? err.message : 'Server error';
    if (String(message).includes('Food not available')) {
      return res.status(400).json({ message });
    }
    if (String(message).includes('own donation')) {
      return res.status(403).json({ message });
    }
    return res.status(500).json({ message: 'Server error', error: message });
  } finally {
    session.endSession();
  }
};

// Transition claim status and keep FoodListing in sync
// allowed transitions: pending -> approved -> completed | cancelled; pending -> cancelled
exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' | 'completed' | 'cancelled'

  if (!['approved', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const session = await Claim.startSession();
  try {
    let updatedClaim = null;
    await session.withTransaction(async () => {
      const claim = await Claim.findById(id).session(session);
      if (!claim) throw new Error('Claim not found');

      // Authorization: owner or admin can change; tighten as needed
      if (claim.user.toString() !== req.user.userId && req.user.role !== 'admin') {
        throw new Error('Forbidden');
      }

      // Enforce simple state machine
      const current = claim.status;
      const valid = (current === 'pending' && (status === 'approved' || status === 'cancelled')) ||
                    (current === 'approved' && (status === 'completed' || status === 'cancelled'));
      if (!valid) throw new Error('Invalid transition');

      claim.status = status;
      updatedClaim = await claim.save({ session });

      // Keep FoodListing.status in sync
      if (status === 'cancelled') {
        await FoodListing.findByIdAndUpdate(claim.foodListing, { status: 'available' }, { session });
      } else if (status === 'completed') {
        await FoodListing.findByIdAndUpdate(claim.foodListing, { status: 'expired' }, { session });
      }
    });

    return res.json(updatedClaim);
  } catch (err) {
    const message = err && err.message ? err.message : 'Server error';
    const code = message === 'Forbidden' ? 403 : (message === 'Claim not found' || message === 'Invalid transition') ? 400 : 500;
    return res.status(code).json({ message });
  } finally {
    session.endSession();
  }
};