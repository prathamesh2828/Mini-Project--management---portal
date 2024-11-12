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
// Team creation route
app.get("/guide/:gd_id/teams", async (req, res) => {
  const { gd_id } = req.params;

  // Attempt to cast gd_id into an integer
  const guideId = parseInt(gd_id, 10); // 10 is the radix for decimal numbers

  // Check if the conversion was successful (NaN means it's not a valid integer)
  if (isNaN(guideId)) {
    return res.status(400).json({
      status: "Error",
      message: "Invalid guide ID format. It must be an integer."
    });
  }

  try {
    const teams = await TeamModel.find({ gd_id: guideId })
      .populate("students") // Populate student details if needed
      .exec();

    if (teams.length === 0) {
      return res.json({ status: "Success", message: "No teams found for this guide." });
    }

    res.json({ status: "Success", teams });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
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


app.get("/guide/:guideId/teams", async (req, res) => {
  try {
    const { guideId } = req.params;

    // Find teams linked to the specified guide ID and populate related fields
    const teams = await TeamModel.find({ guide: guideId })
      .populate('guide', 'name email')   // Populate guide details
      .populate('students', 'name email') // Populate student details
      .populate('prj_id', 'name description'); // Populate project details

    res.json({ status: "Success", teams });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
