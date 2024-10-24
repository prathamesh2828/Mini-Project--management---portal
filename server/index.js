const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const GuideModel = require("./models/Guide");
const StudentModel = require("./models/Student");
const TeamModel = require("./models/Team"); // Import Team model
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/project_portal"); // Use a specific DB name

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

// Team creation route
app.post("/team", async (req, res) => {
  const { grp_id, grp_name, prj_name, guideId, studentIds } = req.body;

  try {
    // Create the team
    const team = await TeamModel.create({
      grp_id,
      grp_name,
      prj_name,
      guide: guideId,
      students: studentIds // Array of student IDs
    });

    // Update guide to link to this team
    await GuideModel.findByIdAndUpdate(guideId, {
      $push: { teams: team._id }
    });

    // Update students to link them to this team
    await StudentModel.updateMany(
      { _id: { $in: studentIds } },
      { $set: { team: team._id } }
    );

    res.json({ status: "Success", team });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
});

// Fetch teams (optional route for retrieving team data)
app.get("/teams", async (req, res) => {
  try {
    const teams = await TeamModel.find()
      .populate('guide') // Populate guide details
      .populate('students'); // Populate student details
    res.json({ status: "Success", teams });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
});
// Route to fetch user profile based on role
app.post("/api/getUserProfile", (req, res) => {
  const { userId, role } = req.body;

  // Use appropriate model based on role
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findById(userId).then((user) => {
    if (user) {
      res.json({ status: "Success", user });
    } else {
      res.json({ status: "Error", message: "User not found" });
    }
  }).catch(err => res.json({ status: "Error", message: err.message }));
});



app.listen(3001, () => {
  console.log("server is running");
});
