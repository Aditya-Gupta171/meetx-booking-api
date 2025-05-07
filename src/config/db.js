const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;