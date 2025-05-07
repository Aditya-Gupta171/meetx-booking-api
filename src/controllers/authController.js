const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phoneNumber, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      name,
      email,
      phoneNumber,
      password
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};