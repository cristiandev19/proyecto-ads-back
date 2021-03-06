require('dotenv').config({ path: '.env.example' });
// dotenv.config({ path: '.env.example' });


const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  mongoConnect: process.env.MONGO_CONNECT
};

module.exports = { config };