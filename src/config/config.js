const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 2025,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'meetx_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '1h'
};