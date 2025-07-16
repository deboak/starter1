// api/server.js
const serverless = require('serverless-http');
const app = require('../app');
const connectDB = require('../db/connect');
let isConnected = false;



const handler = async (req, res) => {
  if (!isConnected) {
    await connectDB(process.env.MONGO_URI);
    isConnected = true;
  }
  return serverless(app)(req, res);
};

module.exports = handler;
