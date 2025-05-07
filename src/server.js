const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const config = require('./config/config');

// Connect to MongoDB Atlas
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to MeetX Booking API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      activities: '/api/activities',
      bookings: '/api/bookings'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

