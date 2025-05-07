const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
exports.bookActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { activityId } = req.body;

  try {
    // Check if activity exists
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: activityId,
      status: 'confirmed'
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Activity already booked by you' });
    }

    // Create new booking
    const booking = await Booking.create({
      user: req.user.id,
      activity: activityId
    });

    // Populate activity details
    await booking.populate('activity');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    // Find all bookings for the logged-in user
    const bookings = await Booking.find({ user: req.user.id })
      .populate('activity')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};