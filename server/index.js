const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');  

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const kanbanRoutes = require("./routes/kanbanRoutes");
const taskRoutes = require("./routes/taskRoutes");  // Import the task routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());  

// Routes
app.use("/api", taskRoutes);  // Use the imported taskRoutes with /api
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", kanbanRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/project_portal")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
