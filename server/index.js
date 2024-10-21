const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const GuideModel = require("./models/Guide");
const StudentModel = require("./models/Student");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mini_project_portal"); // Use a specific DB name

// Login route with role-based redirect
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  // Determine whether to look for a guide or student based on role
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Return a URL for the dashboard based on role along with user data
        const dashboard = role === 'guide' ? '/guide-dashboard' : '/student-dashboard';
        res.json({ status: "Success", user, dashboard });
      } else {
        res.json({ status: "Error", message: "The password is incorrect" });
      }
    } else {
      res.json({ status: "Error", message: "No user found with the provided role and email" });
    }
  }).catch(err => res.json({ status: "Error", message: err.message }));
});


// Register route
app.post("/register", (req, res) => {
  const { role, ...userData } = req.body;

  // Determine whether to create a guide or student based on role
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.create(userData)
    .then((user) => res.json({ status: "Success", user }))
    .catch((err) => res.json({ status: "Error", message: err.message }));
});

app.listen(3001, () => {
  console.log("server is running");
});
