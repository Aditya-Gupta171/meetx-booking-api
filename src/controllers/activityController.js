const { validationResult } = require('express-validator');
const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });
    
    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new activity (for testing/admin purposes)
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, location, dateTime } = req.body;

  try {
    const activity = await Activity.create({
      title,
      description,
      location,
      dateTime
    });

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};