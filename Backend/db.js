const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Retrieve MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;
console.log("MongoDB URI:", mongoURI); // Debugging line to check URI

const connectToMongo = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
