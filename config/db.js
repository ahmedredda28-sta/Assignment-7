const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;
const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("assignment8");
    console.log("Connected to MongoDB successfully!");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};
const getClient = () => client;
module.exports = { connectDB, getDB, getClient };
