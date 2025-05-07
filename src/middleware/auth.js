const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Middleware to protect routes - only authenticated users can access
exports.protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is found, return unauthorized error
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find the user by id from token
    req.user = await User.findById(decoded.id);

    // If no user found with that id
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }
};