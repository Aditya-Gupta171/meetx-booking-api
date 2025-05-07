const express = require('express');
const { check } = require('express-validator');
const { bookActivity, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Book an activity
router.post(
  '/',
  [
    check('activityId', 'Activity ID is required').not().isEmpty()
  ],
  bookActivity
);

// Get logged-in user's bookings
router.get('/', getUserBookings);

module.exports = router;