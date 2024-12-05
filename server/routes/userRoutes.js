const express = require("express");
const router = express.Router();
const GuideModel = require("../models/Guide");
const StudentModel = require("../models/Student");

// Fetch user profile
router.post("/getUserProfile", (req, res) => {
  const { userId, role } = req.body;

  const model = role === "guide" ? GuideModel : StudentModel;

  model.findById(userId)
    .then((user) => {
      if (user) {
        res.json({ status: "Success", user });
      } else {
        res.status(404).json({ status: "Error", message: "User not found" });
      }
    })
    .catch((err) => res.status(500).json({ status: "Error", message: err.message }));
});

module.exports = router;
