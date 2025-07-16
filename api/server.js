const serverless = require('serverless-http');
const app = require('../app');
const connectDB = require('../db/connect');

let isConnected = false;
let handlerWrapped; // ✅ declare once

const handler = async (req, res) => {
  console.log("➡️ Request received");

  if (!isConnected) {
    console.log("🔌 Connecting to Mongo...");
    try {
      await connectDB(process.env.MONGO_URI);
      isConnected = true;
      console.log("✅ Mongo connected");

      handlerWrapped = serverless(app); // ✅ wrap app only once after DB
    } catch (err) {
      console.error("❌ Mongo connection error:", err);
      return res.status(500).json({ message: 'DB error', error: err.message });
    }
  }

  return handlerWrapped(req, res); // ✅ always use the same wrapped app
};

module.exports = handler;
