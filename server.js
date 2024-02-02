const express = require("express");

const connectDB = require("./config/db");
const apiRoutes = require("./routes");

// Creating an Express application
const app = express();

// Setting the port for the server, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the connectDB function
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mounting the API routes from the 'apiRoutes' module
app.use(apiRoutes);

// Default route for handling 404 errors
app.use((req, res) => {
  res.status(404).send("This is not the page you are looking for...");
});

// Start the server, listen on the specified port
const server = app.listen(PORT, () => {
  const address = server.address();

  // Display server information if available
  if (address) {
    const protocol = address.protocol || "http";
    // const host = address.host || "localhost";
    const host = "localhost"; 
    const port = address.port || PORT;

    console.log(`Server running on ${protocol}://${host}:${port}`);
  } else {
    console.error("Failed to retrieve server address.");
  }
});
