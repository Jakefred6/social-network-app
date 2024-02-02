const mongoose = require("mongoose");

// function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // connect to the MongoDB server
    await mongoose.connect("mongodb://localhost/social-network");

    // Logging a success message if the connection is successful
    console.log("MongoDB connected");
  } catch (error) {
    // Handling any errors that occur during the connection attempt
    console.error("MongoDB connection error:", error);

    // Exiting the process with an error code if the connection fails
    process.exit(1);
  }
};

// Exporting the connectDB function to make it accessible in other files
module.exports = connectDB;
