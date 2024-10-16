const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Login route with role-based redirect
app.post("/login", (req, res) => {
  const { email, password, role } = req.body; // Include role in the request
  EmployeeModel.findOne({ email: email, role: role }).then((user) => { // Check email and role
    if (user) {
      if (user.password === password) {
        // Return a URL for the dashboard based on role
        if (user.role === 'guide') {
          res.json({ status: "Success", user, dashboard: '/guide-dashboard' });
        } else if (user.role === 'student') {
          res.json({ status: "Success", user, dashboard: '/student-dashboard' });
        }
      } else {
        res.json({ status: "Error", message: "The password is incorrect" });
      }
    } else {
      res.json({ status: "Error", message: "No user found with the provided role and email" });
    }
  });
});

// Register route
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json({ status: "Success", employees }))
    .catch((err) => res.json({ status: "Error", message: err.message }));
});

app.listen(3001, () => {
  console.log("server is running");
});
