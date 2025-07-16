const serverless = require('serverless-http');
const app = require('../app');
const connectDB = require('../db/connect');

let isConnected = false;

// 🧠 Wrap the app OUTSIDE the handler so it always exists
const handlerWrapped = serverless(app);

const handler = async (req, res) => {
  console.log("➡️ Request received");

  if (!isConnected) {
    console.log("🔌 Connecting to Mongo...");
    try {
      await connectDB(process.env.MONGO_URI);
      isConnected = true;
      console.log("✅ Mongo connected");
    } catch (err) {
      console.error("❌ Mongo connection error:", err);
      return res.status(500).json({ message: 'DB error', error: err.message });
    }
  }

  // 🧠 Always return the already-wrapped app
  return handlerWrapped(req, res);
};

module.exports = handler;
