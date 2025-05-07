const express = require('express');
const { check } = require('express-validator');
const { getActivities, getActivity, createActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getActivities);
router.get('/:id', getActivity);

// Protected route - create activity
router.post(
  '/',
  [
    protect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('dateTime', 'Date and time is required').not().isEmpty()
    ]
  ],
  createActivity
);

module.exports = router;