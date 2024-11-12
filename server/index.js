const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import models (update with correct paths to your models)
const GuideModel = require("./models/GuideModel");
const StudentModel = require("./models/StudentModel");
const TeamModel = require("./models/TeamModel");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/mini_project_portal", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

// Login route
app.post("/login", (req, res) => {
  const { role, email, password } = req.body;

  // Determine the model based on the user's role
  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findOne({ email: email })
    .then(user => {
      if (user && user.password === password) {
        const dashboard = role === 'guide' ? '/guide-dashboard' : '/student-dashboard';
        res.json({ status: "Success", user, dashboard });
      } else {
        res.json({ status: "Error", message: "Invalid email or password" });
      }
    })
    .catch(err => res.json({ status: "Error", message: err.message }));
});

// Register route
app.post("/register", (req, res) => {
  const { role, ...userData } = req.body;

  const model = role === 'guide' ? GuideModel : StudentModel;

  model.create(userData)
    .then(user => res.json({ status: "Success", user }))
    .catch(err => res.json({ status: "Error", message: err.message }));
});

// Team creation route
app.get("/guide/:gd_id/teams", async (req, res) => {
  const { gd_id } = req.params;
  const guideId = parseInt(gd_id, 10);

  if (isNaN(guideId)) {
    return res.status(400).json({ status: "Error", message: "Invalid guide ID format. It must be an integer." });
  }

  try {
    const teams = await TeamModel.find({ gd_id: guideId }).populate("students").exec();

    if (teams.length === 0) {
      res.json({ status: "Success", message: "No teams found for this guide." });
    } else {
      res.json({ status: "Success", teams });
    }
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
});

// User profile route
app.post("/api/getUserProfile", (req, res) => {
  const { userId, role } = req.body;

  const model = role === 'guide' ? GuideModel : StudentModel;

  model.findById(userId)
    .then(user => {
      if (user) {
        res.json({ status: "Success", user });
      } else {
        res.json({ status: "Error", message: "User not found" });
      }
    })
    .catch(err => res.json({ status: "Error", message: err.message }));
});

// Another team route with populated fields
app.get("/guide/:guideId/teamsWithDetails", async (req, res) => {
  const { guideId } = req.params;

  try {
    const teams = await TeamModel.find({ guide: guideId })
      .populate("guide", "name email")
      .populate("students", "name email")
      .populate("prj_id", "name description");

    res.json({ status: "Success", teams });
  } catch (err) {
    res.json({ status: "Error", message: err.message });
  }
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
