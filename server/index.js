const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Auth routes
const userRoutes = require("./routes/userRoutes"); // User routes
const kanbanRoutes = require("./routes/kanbanRoutes"); // Kanban routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use JSON parser middleware for POST requests

// Routes
app.use("/auth", authRoutes); // All routes in authRoutes.js will be prefixed with /auth
app.use("/api", userRoutes); // All routes in userRoutes.js will be prefixed with /user
app.use('/api', kanbanRoutes); // All routes in kanbanRoutes.js will be prefixed with /kanbans under /api

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/project_portal")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
