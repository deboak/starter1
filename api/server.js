const serverless = require('serverless-http');
const app = require('../app');
const connectDB = require('../db/connect');

let isConnected = false;
const handlerWrapped = serverless(app); // wrap ONCE

const handler = async (req, res) => {
  if (!isConnected) {
    console.log("Connecting to MongoDB...");
    await connectDB(process.env.MONGO_URI);
    isConnected = true;
    console.log("Connected.");
  }
  return handlerWrapped(req, res);
};

module.exports = handler;
